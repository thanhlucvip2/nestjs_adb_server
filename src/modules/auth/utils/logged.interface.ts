import { Role } from '@utils/types';
import { Request, Response } from 'express';
export interface LoggedInterface {
  id: string;
  email: string;
  role: Role;
  roleUser?: string;
  fullName: string;
}
export type RequestCustom = Request & {
  user: LoggedInterface;
};

export type ResponseCustom = Response;
