import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { EmailType } from "../constants";
import { EmailUtil } from "../utils";

@Injectable()
export class EmailService {
    constructor(private readonly mailService: MailerService) {}

    public async sendMailTo(recipient: string): Promise<unknown> {
        console.log(EmailUtil.prepareTemplate(EmailType.ACCOUNT_CREATION, recipient));
        return this.mailService.sendMail(EmailUtil.prepareTemplate(EmailType.ACCOUNT_CREATION, recipient))
    }
    
}