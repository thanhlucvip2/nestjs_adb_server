import { Injectable } from '@nestjs/common';

import { UploadFileService } from '../../upload-file.service';

@Injectable()
export class GetFileFeature {
  constructor(private readonly uploadFileService: UploadFileService) {}

  async index({
    accountId,
    fileName,
  }: {
    fileName: string;
    accountId: string;
  }) {
    const getFileData = await this.uploadFileService.findOneByFileName({
      accountId,
      fileName,
    });
    return getFileData;
  }
}
