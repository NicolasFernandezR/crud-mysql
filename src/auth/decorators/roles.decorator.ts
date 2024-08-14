import { SetMetadata } from '@nestjs/common';
import { Rol } from '../emuns/rol.enum';

export const ROLES_KEY = 'roles';
export const Roles = (role: Rol) => SetMetadata(ROLES_KEY, role);
