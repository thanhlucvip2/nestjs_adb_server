import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { UploadFileEntity } from '@modules/upload-file/upload-file.entity';
import { TYPE_FILE } from '@utils/enums';

import { UploadFileService } from '../../upload-file.service';

@Injectable()
export class PostFileFeature {
  constructor(private readonly uploadFileService: UploadFileService) {}

  async index({
    accountId,
    file,
    currentPath,
  }: {
    file: Express.Multer.File;
    currentPath: string;
    accountId: string;
  }) {
    if (!file) {
      throw new HttpException('Vui lòng gửi file', HttpStatus.BAD_REQUEST);
    }

    const sentences = file.originalname.split('.');

    const dataFile: UploadFileEntity = {
      account_id: accountId,
      current_path: currentPath,
      name: file.originalname,
      size: file.size,
      type_file: sentences[sentences.length - 1],
      path: file.filename,
      type: TYPE_FILE.FILE.VALUE,
    };

    const saveFileDB = await this.uploadFileService.create(dataFile);
    return saveFileDB;
  }
}
