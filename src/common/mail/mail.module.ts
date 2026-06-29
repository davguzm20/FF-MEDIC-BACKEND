import { Module, Global } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { envConfig } from '../../config/env.config';

const config = envConfig();

@Global()
@Module({
  providers: [
    {
      provide: 'SENDGRID',
      useFactory: () => {
        sgMail.setApiKey(config.sendgridApiKey);
        return sgMail;
      },
    },
  ],
  exports: ['SENDGRID'],
})
export class MailModule {}
