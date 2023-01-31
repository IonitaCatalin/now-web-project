import { MailerService } from "@nestjs-modules/mailer";
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { EmailService } from '../services';

@Controller()
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @MessagePattern({ action: 'send-email' })
    public async sendEmail({ userId, email }: {userId: string, email: string} ): Promise<boolean> {
        await this.emailService.sendMailTo(email);
        return true;
    }
}