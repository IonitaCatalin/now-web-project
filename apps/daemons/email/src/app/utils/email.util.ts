import { ISendMailOptions } from '@nestjs-modules/mailer';
import { EmailType, templates } from '../constants';

export class EmailUtil {
    public static prepareTemplate(type: EmailType, to?: string): ISendMailOptions  {
        return {
            ...templates[type].options,
            to
        }
    }
}