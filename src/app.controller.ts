import { Controller, Get } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getEvents(): Promise<IEvent[]> {
    const events = await this.appService.getEvents();
    return events;
  }

}
