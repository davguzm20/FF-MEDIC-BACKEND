import { Module, Global } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { envConfig } from '@config/env.config';

@Global()
@Module({
  providers: [
    {
      provide: 'MAIL_TRANSPORT',
      useFactory: () => {
        const config = envConfig();
        return createTransport(config.smtpUrl);
      },
    },
  ],
  exports: ['MAIL_TRANSPORT'],
})
export class MailModule {}
