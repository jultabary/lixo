/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface Query {}
export interface Response {}
export interface QueryHandler<Q extends Query, R extends Response> {
  handle(query: Q): Promise<R>;
  registeredQuery(): string;
}
