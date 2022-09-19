import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: process.env.SMTP_USER,
      subject: 'Cambio de contraseña',
      template: 'recoverpassword',
      context: {
        url,
        name: email,
      },
    });
  }
}
