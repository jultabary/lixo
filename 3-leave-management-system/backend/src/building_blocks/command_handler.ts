// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Command {}
export abstract class Event {
  time: Date;
  constructor() {
    this.time = new Date();
  }
}

export interface CommandHandler<T extends Command, E extends Event> {
  handle(command: T): Promise<E>;
  registeredCommand(): string;
}
