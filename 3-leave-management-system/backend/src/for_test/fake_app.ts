import { Injectable } from '@nestjs/common';
import { Command, Event } from '../building_blocks/command_handler';
import { Query, Response } from '../building_blocks/query_handler';

@Injectable()
export class FakeApp {
  eventToBeReturned: Event;
  responseToBeReturned: Response;
  handledCommands: Command[];
  handledQueries: Query[];

  constructor() {
    this.handledCommands = [];
    this.handledQueries = [];
  }

  setEventToBeReturned(event: Event): void {
    this.eventToBeReturned = event;
  }

  setResponseToBeReturned(response: Response): void {
    this.responseToBeReturned = response;
  }

  async dispatchCommand(command: Command): Promise<Event> {
    this.handledCommands.push(command);
    return this.eventToBeReturned;
  }

  async dispatchQuery(query: Query): Promise<Response> {
    this.handledQueries.push(query);
    return this.responseToBeReturned;
  }

  haveBeenCalledWithCommand(command: Command): boolean {
    return (
      this.handledCommands.find(
        (commandHandled) =>
          JSON.stringify(commandHandled) === JSON.stringify(command),
      ) !== undefined
    );
  }

  haveBeenCalledWithQuery(query: Query): boolean {
    return (
      this.handledQueries.find(
        (queryHandled) =>
          JSON.stringify(queryHandled) === JSON.stringify(query),
      ) !== undefined
    );
  }
}
