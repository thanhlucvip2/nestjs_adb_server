import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UploadFileRepository } from './upload-file.repository';
import { UploadFileEntity } from './upload-file.entity';
import { GetFileMapper } from './mapper/get-file.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class UploadFileService {
  constructor(
    private readonly uploadFileRepository: UploadFileRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async find(condition?: Partial<UploadFileEntity>, relations?: string[]) {
    const data = await this.uploadFileRepository.find({
      where: {
        ...condition,
      },
      relations: relations,
      order: { type: 'ASC' },
    });

    const result = this.mapper.mapArray(data, UploadFileEntity, GetFileMapper);

    return result;
  }

  async findOne(payload: { id: string; accountId: string }) {
    const data = await this.uploadFileRepository.findOne({
      where: {
        id: payload.id,
        account_id: payload.accountId,
      },
    });

    const result = this.mapper.map(data, UploadFileEntity, GetFileMapper);

    return result;
  }

  async create(payload: UploadFileEntity) {
    const newData = await this.uploadFileRepository.create(payload);
    await this.uploadFileRepository.save(payload);

    const result = this.mapper.map(newData, UploadFileEntity, GetFileMapper);
    return result;
  }

  async findOneByCurrentPathAndPath(payload: {
    currentPath: string;
    accountId: string;
    path: string;
  }) {
    const data = await this.uploadFileRepository.findOne({
      where: {
        current_path: payload.currentPath,
        path: payload.path,
        account_id: payload.accountId,
      },
    });
    const result = this.mapper.map(data, UploadFileEntity, GetFileMapper);
    return result;
  }

  async findOneByFileName(payload: { accountId: string; fileName }) {
    const data = await this.uploadFileRepository.findOne({
      where: {
        account_id: payload.accountId,
        path: payload.fileName,
      },
    });
    const result = this.mapper.map(data, UploadFileEntity, GetFileMapper);
    return result;
  }

  async delete({ accountId, id }: { id: string; accountId: string }) {
    const findFile = await this.findOne({
      id,
      accountId,
    });
    console.log(findFile);

    if (!findFile) {
      throw new HttpException(
        'File không tồn tại trong hệ thông',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.uploadFileRepository.delete({ id });
    return findFile;
  }

  // async updateFile(fileId: string, fileName: string) {
  //   if (!fileName) {
  //     throw new HttpException(
  //       'Vui lòng điền đủ thông tin',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   const image = await this.uploadFileRepository.findOne({
  //     where: { fileId },
  //   });
  //   if (!image) {
  //     throw new HttpException(
  //       'Image không tồn tại trong hệ thống',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   await this.uploadFileRepository.update({ fileId }, { ...image, fileName });
  //   return await this.uploadFileRepository.findOne({ where: { fileId } });
  // }
}
