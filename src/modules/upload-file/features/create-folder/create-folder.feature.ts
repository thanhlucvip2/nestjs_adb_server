import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UploadFileService } from '../../upload-file.service';
import { CreateFolderDto } from './create-folder.dto';
import { TYPE_FILE } from '@utils/enums';
import { convertVNStringToKeyString } from '@utils/helper';

@Injectable()
export class CreateFolderFeature {
  constructor(private readonly uploadFileService: UploadFileService) {}

  async index({
    accountId,
    payload,
  }: {
    accountId: string;
    payload: CreateFolderDto;
  }) {
    // check current path
    const getCurrentPath =
      await this.uploadFileService.findOneByCurrentPathAndPath({
        currentPath: payload.currentPath,
        path: convertVNStringToKeyString(payload.name),
        accountId,
      });
    if (getCurrentPath) {
      throw new HttpException(
        'Tên folder đã tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    // save
    await this.uploadFileService.create({
      account_id: accountId,
      name: payload.name,
      current_path: payload.currentPath,
      path: convertVNStringToKeyString(payload.name),
      type: TYPE_FILE.FOLDER.VALUE,
      size: null,
      type_file: null,
    });

    return null;
  }
}
