import { Store } from './Store';
import { Action, Reducer, State, Listener } from './types';

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

    const dummyReducerFunc1 = jest.fn();
    const randomValue = Math.random() + 100500;
    dummyReducerFunc1.mockReturnValue(randomValue);

    const reducer: Reducer = {
      test: dummyReducerFunc1,
    };

    const dummyReducerFunc2 = jest.fn();
    const reducerNext: Reducer = {
      test: dummyReducerFunc2,
    };

    const store = new Store(initialState, reducer);
    expect(store.replaceReducer).toBeInstanceOf(Function);

    const randomAction: Action = {
      type: 'dummyAction',
      payload: {
        rnd: Math.random(),
      },
    };

    store.dispatch(randomAction);
    expect(dummyReducerFunc1).toHaveBeenCalledTimes(1);

    expect(dummyReducerFunc2).not.toBeCalled();
    store.replaceReducer(reducerNext);

    store.dispatch(randomAction);

    expect(dummyReducerFunc2).toHaveBeenCalledTimes(1);
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

    const reducer: Reducer = {
      test: dummyReducerFunc1,
    };

    const initialState = {
      rand: Math.random(),
      dummyReducerFunc: dummyReducerFunc1,
    };
    const store = new Store(initialState, reducer);

    const listener: Listener = jest.fn();

    store.subscribe(listener);

    const randomAction: Action = {
      type: 'dummyAction',
      payload: {
        rnd: Math.random(),
      },
    };

    const reducedState: State = {
      test: randomValue,
    };

    store.dispatch(randomAction);
    expect(dummyReducerFunc1).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(reducedState);
  });
  it('subs  must have  unsubscribe function', () => {
    const randomValue = Math.random();
    const dummyReducerFunc1 = jest.fn();
    dummyReducerFunc1.mockReturnValue(randomValue);

    const reducer: Reducer = {
      test: dummyReducerFunc1,
    };

    const initialState = {
      rand: Math.random(),
      dummyReducerFunc: dummyReducerFunc1,
    };
    const store = new Store(initialState, reducer);

    const listener: Listener = jest.fn();

    const unsubsFunction = store.subscribe(listener);

    const randomAction: Action = {
      type: 'dummyAction',
      payload: {
        rnd: Math.random(),
      },
    };

    const reducedState: State = {
      test: randomValue,
    };

    store.dispatch(randomAction);
    expect(dummyReducerFunc1).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(reducedState);

    unsubsFunction();
    store.dispatch(randomAction);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe(' test dipatch', () => {
  it('call dipatch', () => {
    const dummyReducerFunc1 = jest.fn();
    const dummyReducerFunc2 = jest.fn();

    const rndValue = Math.random() * 100 + 135;
    const redFunc = (stm: State): void => {
      stm['rand'] = rndValue;
    };

    const reducer: Reducer = {
      test: dummyReducerFunc1,
      test2: dummyReducerFunc2,
      test3: redFunc,
    };

    const initialState = {
      rand: Math.random(),
      dummyReducerFunc: dummyReducerFunc1,
    };
    const store = new Store(initialState, reducer);

    const randomAction: Action = {
      type: 'dummyAction',
      payload: {
        rnd: Math.random(),
      },
    };
    store.dispatch(randomAction);
    expect(dummyReducerFunc1).toHaveBeenCalledTimes(1);
    expect(dummyReducerFunc1).toHaveBeenCalledWith(initialState, randomAction);
    expect(dummyReducerFunc2).toHaveBeenCalledTimes(1);
    expect(dummyReducerFunc2).toHaveBeenCalledWith(initialState, randomAction);
    expect(initialState.rand).toEqual(rndValue);
  });
});
