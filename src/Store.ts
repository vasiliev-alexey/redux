// export type StoreT<State = any, Action = { type: string }> = {
//   getState(): State;
//   dispatch(action: Action): any;
//   subscribe(cb: () => void): () => void;
// };

export class Store<
  State = { [key: string]: unknown },
  Reducers = { [key: string]: Function }
> {
  private state: { [key: string]: unknown };
  private reducers: Record<string, unknown>;

  public constructor(reducers?: Reducers, initialState?: State) {
    this.reducers = reducers ?? {};
    this.state = initialState ?? {};
  }

  dispatch(): void {
    return undefined;
  }

  getState(): void {
    return undefined;
  }

  subscribe(): void {
    return undefined;
  }

  replaceReducer(): void {
    return undefined;
  }
}
