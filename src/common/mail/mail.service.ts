import { Injectable } from '@nestjs/common';
import { envConfig } from '@config/env.config';

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private readonly config = envConfig();

  async sendMail({ to, subject, html }: SendMailOptions): Promise<boolean> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.config.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.config.mailFrom,
          to,
          subject,
          html,
        }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { message?: string };
        console.error('Resend API error:', JSON.stringify(result));
        return false;
      }

      return true;
    } catch (error) {
      console.error('Resend send error:', (error as Error).message);
      return false;
    }
  }
}
