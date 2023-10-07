import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
  Res,
  Delete,
  Param,
  Req,
  UseGuards,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ServiceGuard } from '@modules/auth/guards';
import { AuthGuard } from '@nestjs/passport';
import { assign } from 'lodash';

import {
  RequestCustom,
  ResponseCustom,
} from '@modules/auth/utils/logged.interface';
import { URL_FILE } from '@configs/app.config';
import { convertVNStringToKeyString } from '@utils/helper';

import { GetAllFileFeature } from './features/get-all-file/get-all-file.feature';
import { GetAllFileDto } from './features/get-all-file/get-all-file.dto';
import { CreateFolderFeature } from './features/create-folder/create-folder.feature';
import { CreateFolderDto } from './features/create-folder/create-folder.dto';
import { PostFileFeature } from './features/post-file/post-file.feature';
import { PostFileDto } from './features/post-file/post-file.dto';
import { GetFileFeature } from './features/get-file/get-file.feature';
import { DeleteFileFeature } from './features/delete-file/delete-file.feature';

@Controller('upload')
export class UploadFileController {
  constructor(
    private readonly getAllFileFeature: GetAllFileFeature,
    private readonly createFolderFeature: CreateFolderFeature,
    private readonly postFileFeature: PostFileFeature,
    private readonly getFileFeature: GetFileFeature,
    private readonly deleteFileFeature: DeleteFileFeature,
  ) {}

  @UseGuards(AuthGuard('jwt'), ServiceGuard)
  @Get()
  async find(
    @Query() queryParam: GetAllFileDto,
    @Req() req: RequestCustom,
    @Res() res: ResponseCustom,
  ) {
    const httpStatusCode = HttpStatus.OK;
    const resData = {
      statusCode: httpStatusCode,
      success: 'get-all-file-success',
      data: null,
    };

    try {
      const { user: currentUser } = req;
      const result = await this.getAllFileFeature.index({
        accountId: currentUser.id,
        currentPath: queryParam.currentPath,
      });

      assign(resData, {
        data: result,
      });
    } catch (error) {
      throw new HttpException(error.message, httpStatusCode);
    }

    return res.status(httpStatusCode).json(resData);
  }

  @UseGuards(AuthGuard('jwt'), ServiceGuard)
  @Post('create-folder')
  async createFolder(
    @Body() payload: CreateFolderDto,
    @Req() req: RequestCustom,
    @Res() res: ResponseCustom,
  ) {
    const httpStatusCode = HttpStatus.OK;
    const resData = {
      statusCode: httpStatusCode,
      success: 'create-folder-success',
      data: null,
    };

    try {
      const { user: currentUser } = req;
      const result = await this.createFolderFeature.index({
        accountId: currentUser.id,
        payload,
      });

      assign(resData, {
        data: result,
      });
    } catch (error) {
      throw new HttpException(error.message, httpStatusCode);
    }

    return res.status(httpStatusCode).json(resData);
  }

  @UseGuards(AuthGuard('jwt'), ServiceGuard)
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: URL_FILE,
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now();
          const filename = `${uniqueSuffix}_${convertVNStringToKeyString(
            file.originalname,
          )}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async handleUpload(
    @Query() queryParam: PostFileDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestCustom,
    @Res() res: ResponseCustom,
  ) {
    const httpStatusCode = HttpStatus.OK;
    const resData = {
      statusCode: httpStatusCode,
      success: 'upload-file-success',
      data: null,
    };

    try {
      const { user: currentUser } = req;
      const result = await this.postFileFeature.index({
        file,
        accountId: currentUser.id,
        currentPath: queryParam.currentPath,
      });

      assign(resData, {
        data: result,
      });
    } catch (error) {
      throw new HttpException(error.message, httpStatusCode);
    }

    return res.status(httpStatusCode).json(resData);
  }

  @Get('get-file/:fileName')
  async downloadFile(
    @Param('fileName') fileName: string,
    @Req() req: RequestCustom,
    @Res() res: ResponseCustom,
  ) {
    // try {
    // const { user: currentUser } = req;
    // const result = await this.getFileFeature.index({
    //   fileName,
    //   accountId: currentUser.id,
    // });
    // if (!result) {
    //   throw new HttpException('File không tồn tại', HttpStatus.BAD_REQUEST);
    // }
    return res.sendFile(`${URL_FILE}/${fileName}`, { root: '' });
    // } catch (error) {
    //   throw new HttpException('File không tồn tại', HttpStatus.BAD_REQUEST);
    // }
  }

  @UseGuards(AuthGuard('jwt'), ServiceGuard)
  @Delete(':id')
  async deleteFile(
    @Param('id') id: string,
    @Req() req: RequestCustom,
    @Res() res: ResponseCustom,
  ) {
    const httpStatusCode = HttpStatus.OK;
    const resData = {
      statusCode: httpStatusCode,
      success: 'delete-file-success',
      data: null,
    };

    try {
      const { user: currentUser } = req;
      const result = await this.deleteFileFeature.index({
        accountId: currentUser.id,
        id,
      });

      assign(resData, {
        data: result,
      });
    } catch (error) {
      throw new HttpException(error.message, httpStatusCode);
    }

    return res.status(httpStatusCode).json(resData);
  }
}
