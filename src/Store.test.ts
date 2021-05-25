import { Store } from './Store';
import { Action, Reducer, State, Listener, Reducers } from './types';

describe('Store must be class', () => {
  it('constructor test', () => {
    expect(Store).toBeInstanceOf(Function);
    expect(new Store()).toBeInstanceOf(Store);
  });

  it('constructor should save initial state', () => {
    const initialState = { rand: Math.random() };
    const store = new Store(initialState);
    expect(store.getState()).toEqual(initialState);
  });

  it('store shoud have specific method', () => {
    const initialState = { rand: Math.random() };
    const store = new Store(initialState);
    expect(store.getState).toBeInstanceOf(Function);
    expect(store.dispatch).toBeInstanceOf(Function);
    expect(store.subscribe).toBeInstanceOf(Function);
    expect(store.subscribe(jest.fn())).toBeInstanceOf(Function);
    expect(store.replaceReducer).toBeInstanceOf(Function);
  });
});

describe('test next reducer', () => {
  it('store have method to change reducer', () => {
    const initialState = { rand: Math.random() };

    const reducer: Reducer<State> = jest.fn();
    const dummyReducerFunc2 = jest.fn();
    const reducerNext = jest.fn();

    const store = new Store(initialState, reducer);
    expect(store.replaceReducer).toBeInstanceOf(Function);

    const randomAction: Action = {
      type: 'dummyAction',
      payload: {
        rnd: Math.random(),
      },
    };

    store.dispatch(randomAction);
    expect(reducer).toHaveBeenCalledTimes(1);

    expect(dummyReducerFunc2).not.toBeCalled();
    store.replaceReducer(reducerNext);

    store.dispatch(randomAction);

    expect(reducerNext).toHaveBeenCalledTimes(1);
  });
});

describe(' test subscribers', () => {
  it('add subs', () => {
    const initialState = { rand: Math.random() };
    const store = new Store(initialState);
    expect(store.subscribe(jest.fn())).toBeInstanceOf(Function);
  });

  it('subs  must have  call in dispatch', () => {
    const randomValue = Math.random();
    const dummyReducerFunc1 = jest.fn();
    dummyReducerFunc1.mockReturnValue(randomValue);
    const initialState = {
      rand: Math.random(),
      dummyReducerFunc: dummyReducerFunc1,
    };
    const reducedState: State = {
      test: randomValue,
    };

    const reducer: Reducer<State> = jest.fn().mockReturnValue(reducedState);

    const store = new Store(initialState, reducer);

    const listener: Listener = jest.fn();

    store.subscribe(listener);

    const randomAction: Action = {
      type: 'dummyAction',
      payload: {
        rnd: Math.random(),
      },
    };

    store.dispatch(randomAction);
    expect(reducer).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(reducedState);
  });

  it('subs  must have  unsubscribe function', () => {
    const randomValue = Math.random();
    const dummyReducerFunc1 = jest.fn();
    dummyReducerFunc1.mockReturnValue(randomValue);

    const initialState = {
      rand: Math.random(),
    };
    const reducedState: State = {
      test: randomValue,
    };
    const reducer: Reducer<State> = jest.fn().mockReturnValue(reducedState);

    const store = new Store(initialState, reducer);

    const listener: Listener = jest.fn();

    const unsubsFunction = store.subscribe(listener);

    const randomAction: Action = {
      type: 'dummyAction',
      payload: {
        rnd: Math.random(),
      },
    };

    store.dispatch(randomAction);
    expect(reducer).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(reducedState);

    unsubsFunction();
    store.dispatch(randomAction);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
