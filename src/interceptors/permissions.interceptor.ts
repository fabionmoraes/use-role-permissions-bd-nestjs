import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { NextPermission, UserRoles } from 'role-permissions-bd';

@Injectable()
export class PermissionsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const user: any = request.user;

    const passed = NextPermission({
      request,
      userRoles: UserRoles(user.user_roles),
    });

    if (passed) {
      return next.handle();
    }

    throw new HttpException('User not permission', 403);
  }
}
