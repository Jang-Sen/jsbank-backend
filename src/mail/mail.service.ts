import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  private mail: Mail;
  constructor(private readonly configService: ConfigService) {
    this.mail = createTransport({
      service: configService.get('MAIL_SERVICE'),
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    });
  }

  // 메일 전송하는 로직
  sendMail(options: Mail.Options) {
    return this.mail.sendMail(options);
  }
}
