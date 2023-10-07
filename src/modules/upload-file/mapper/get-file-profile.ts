import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  CamelCaseNamingConvention,
  createMap,
  namingConventions,
  SnakeCaseNamingConvention,
  type Mapper,
  forMember,
  mapFrom,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UploadFileEntity } from '@modules/upload-file/upload-file.entity';
import { GetFileMapper } from './get-file.mapper';
import { TYPE_FILE } from '@utils/enums';
import { convertSizeFileToString } from '@utils/helper';

@Injectable()
export class GetFileProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        UploadFileEntity,
        GetFileMapper,
        namingConventions({
          source: new SnakeCaseNamingConvention(),
          destination: new CamelCaseNamingConvention(),
        }),
        forMember(
          (d) => d.type,
          mapFrom((s) =>
            s.type === TYPE_FILE.FOLDER.VALUE
              ? TYPE_FILE.FOLDER.LABEL
              : TYPE_FILE.FILE.LABEL,
          ),
        ),
        forMember(
          (d) => d.typeFile,
          mapFrom((s) => s.type_file),
        ),
        forMember(
          (d) => d.url,
          mapFrom((s) => `/upload/get-file/${s.path}`),
        ),
        forMember(
          (d) => d.size,
          mapFrom((s) => convertSizeFileToString(s.size)),
        ),
      );
    };
  }
}
