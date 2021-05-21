import { State, Reducer, Listener, Action } from './types';

export class Store {
  private state: State;
  private reducer: Reducer;

  private subscribers: Set<Listener>;

  defaultState = { ss: 1 };

  public constructor(initialState?: State, reducer?: Reducer) {
    this.reducer = reducer ?? {};
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

    return undefined;
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

    console.log('subs count', this.subscribers.size);

    console.log('subs:', JSON.stringify(this.subscribers));
    return () => {
      console.log('uns:', JSON.stringify(this.subscribers));
      this.subscribers.delete(listener);
    };
  }

  replaceReducer(nextReducer: Reducer): void {
    this.reducer = nextReducer;
  }

  private reduce(state: State, action: Action): State {
    console.log('called');

    const newState: State = {};
    console.log(JSON.stringify(this.reducer));

    for (const funcName in this.reducer) {
      console.log('called 2');
      newState[funcName] = this.reducer[funcName](state, action);
    }

    return newState;
  }
}
