import { Controller, Get } from '@nestjs/common';

@Controller('msg')
export class MsgController {
  @Get()
  getMessage(): string {
    return 'hello there';
  }
}