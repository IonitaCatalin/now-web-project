import { Module } from "@nestjs/common";
import { EmailController } from "./controllers";
import { EmailService } from "./services";
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [MailerModule.forRoot({
      transport: {
      host: 'smtp.sendgrid.net',
      auth: {
        user: 'apikey',
        pass: process.env.SEND_GRID_PASS,
      },
    }})],
    controllers: [EmailController],
    providers: [EmailService],
  })
export class DaemonEmailModule {}