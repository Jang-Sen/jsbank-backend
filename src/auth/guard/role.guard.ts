import { Role } from '@user/entities/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { TokenGuard } from '@auth/guard/token.guard';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends TokenGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const req = context.switchToHttp().getRequest<RequestUserInterface>();
      const user = req.user;

      return user?.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
