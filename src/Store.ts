import { State, Reducer, Listener, Action } from './types';

export class Store {
  private state: State;
  private reducer: Reducer<State>;

  private subscribers: Set<Listener>;

  public constructor(initialState?: State, reducer?: Reducer<State>) {
    if (reducer) {
      this.reducer = reducer;
    }
    this.state = initialState ?? {};
    this.subscribers = new Set<Listener>();
  }

  /**
   *
   * @param action  - Обработка изменений  state на основании action
   * @returns - ничего не возвращает
   */
  dispatch(action: Action): void {
    this.state = this.reduce(this.state, action);
    this.subscribers.forEach((fn) => fn(this.state));
  }

  /**
   *
   * @returns Возвращает текущее состояние State -
   *          например по сле мутации через reducer
   */
  getState(): State {
    return this.state;
  }
  /**
   *
   * @param listener  - оповещаем подписчиков об измнении
   * @returns
   */
  subscribe(listener: Listener): Function {
    this.subscribers.add(listener);
    return () => {
      this.subscribers.delete(listener);
    };
  }

  replaceReducer(nextReducer: Reducer<State>): void {
    this.reducer = nextReducer;
  }

  private reduce(state: State, action: Action): State {
    let newState: State = {};

    // for (const funcName in this.reducer) {
    //   newState[funcName] = this.reducer[funcName](state, action);
    // }
    newState = this.reducer(state, action);
    return newState;
  }
}
