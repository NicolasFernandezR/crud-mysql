import { applyDecorators, UseGuards } from '@nestjs/common';
import { Rol } from '../emuns/rol.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(role: Rol) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
