import { Injectable } from '@nestjs/common';

import { UploadFileService } from '../../upload-file.service';

@Injectable()
export class GetAllFileFeature {
  constructor(private readonly uploadFileService: UploadFileService) {}

  async index(param: { accountId: string; currentPath: string }) {
    const result = await this.uploadFileService.find({
      account_id: param.accountId,
      current_path: param.currentPath,
    });

    return result;
  }
}
