import { CurrentUser } from '@auth/jwt/decorators/current-user.decorator';

describe('CurrentUserDecorator', () => {
  it('debe estar definido', () => {
    expect(CurrentUser).toBeDefined();
  });
});
