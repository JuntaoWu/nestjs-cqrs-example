import { FORWARDS, START } from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { client as eventStore } from './services/event-store';
import { PromotedEvent } from './person/domain/promote/promote.event';

@Injectable()
export class AppService {
  async getEvents(): Promise<IEvent[]> {
    const events = eventStore.readAll({
      direction: FORWARDS,
      fromPosition: START,
      maxCount: 1000
    });

    const result = [];
    for await (const { event } of events) {
      switch (event?.type) {
        case 'PersonInitializedEvent':
        case 'PromotedEvent':
          result.push({
            type: event?.type,
            data: event?.data,
          });
          break;
      }
    }
    return result;

    // const promotions = [];

    // for await (const { event } of events) {
    //   const data: any = event.data;

    //   switch (event?.type) {
    //     case "PromotedEvent":
    //       promotions.push(data);
    //       break;
    //   }
    // }

    // return promotions;
  }
}
