import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserRole } from '@prisma/client';

interface UserPayload {
  userId: number;
  username: string;
  role: UserRole;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: UserPayload }>();
    return request.user;
  },
);
