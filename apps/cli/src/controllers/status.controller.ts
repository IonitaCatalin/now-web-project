import { Controller, Get } from '@nestjs/common';

@Controller()
export class StatusController {
  @Get('')
  get(): string {
    return 'okie-dockie';
  }
}
