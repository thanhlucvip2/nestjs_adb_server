import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UploadFileEntity } from './upload-file.entity';

export class UploadFileRepository extends Repository<UploadFileEntity> {
  constructor(
    @InjectRepository(UploadFileEntity)
    private uploadFileRepository: Repository<UploadFileEntity>,
  ) {
    super(
      uploadFileRepository.target,
      uploadFileRepository.manager,
      uploadFileRepository.queryRunner,
    );
  }
}
