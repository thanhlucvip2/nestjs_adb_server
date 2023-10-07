import { Role, TypeFile } from './types';

export const ROLE = {
  USER: {
    LABEL: 'USER',
    VALUE: 0 as Role,
  },
  ADMIN: {
    LABEL: 'ADMIN',
    VALUE: 1 as Role,
  },
};
export const TYPE_FILE = {
  FOLDER: {
    LABEL: 'FOLDER',
    VALUE: 0 as TypeFile,
  },
  FILE: {
    LABEL: 'FILE',
    VALUE: 1 as TypeFile,
  },
};
