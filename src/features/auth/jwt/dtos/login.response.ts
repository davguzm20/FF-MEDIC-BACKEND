import { UserResponse } from '@auth/user/dtos/user.response';

export class LoginResponse {
  accessToken!: string;
  refreshToken!: string;
  user!: UserResponse;
}
