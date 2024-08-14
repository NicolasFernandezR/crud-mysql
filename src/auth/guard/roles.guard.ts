import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Rol } from '../emuns/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<Rol>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!role) return true;

    const request = context.switchToHttp().getRequest();

    return role === request.user.role;
  }
}
