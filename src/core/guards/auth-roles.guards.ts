import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ADMIN_ROLES, USER_ROLES } from '../../common';
@Injectable()
export class AuthRolesGuard extends AuthGuard('jwt') {
  readonly roles: (ADMIN_ROLES | USER_ROLES)[];
  constructor(...roles: (ADMIN_ROLES | USER_ROLES)[]) {
    super();
    this.roles = roles;
  }

  handleRequest(err, user, info, context: ExecutionContextHost) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException({
          message: `You don't have the authority.`,
          error: 401,
        })
      );
    }
    // if (this.roles.length) {
    //   const newArray = [];
    //   const arrayedRoles = user.authCode.split(',');
    //   arrayedRoles.map((levels) => newArray.push(levels));
    //   const hasRoles = () => this.roles.some((role) => newArray.includes(role));
    //   if (!user || !hasRoles()) {
    //     throw new ForbiddenException({
    //       message: '죄송합니다. 권한이 없습니다.',
    //       error: 403,
    //     });
    //   }
    // }
    return user;
  }
}
