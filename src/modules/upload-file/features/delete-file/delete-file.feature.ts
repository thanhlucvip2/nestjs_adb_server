import { Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';

import { URL_FILE } from '@configs/app.config';

import { UploadFileService } from '../../upload-file.service';

@Injectable()
export class DeleteFileFeature {
  constructor(private readonly uploadFileService: UploadFileService) {}

  async index({ id, accountId }: { id: string; accountId: string }) {
    const deleteFile = await this.uploadFileService.delete({ id, accountId });
    unlinkSync(`${URL_FILE}/${deleteFile.path}`);
    return null;
  }
}
