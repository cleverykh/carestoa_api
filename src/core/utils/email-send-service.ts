import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSendService {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * email send
   * @param to 받는사람
   * @param subject 메일 제목
   * @param templateName 사용할 ejs 템플릿
   */
  async send(
    to: string,
    subject: string,
    templateName: string,
    authenticationNumber: string,
  ): Promise<any> {
    return await this.mailerService.sendMail({
      to,
      subject,
      html: `
      <div class="wrap-content">
        <p class="title">CareSTOA 이메일 인증 안내</p>
        <p class="description">
          인증번호는 : ${authenticationNumber}
        </p>
      </div>
      `,
    });
  }
}
