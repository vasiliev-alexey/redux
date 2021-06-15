import { applyMiddleware } from './applyMiddleware';
import { State } from './types';

describe('applyMiddleware must be function', () => {
  test('function type', () => {
    expect(applyMiddleware).toBeInstanceOf(Function);
    expect(applyMiddleware(jest.fn(), jest.fn())).toBeInstanceOf(Function);
  });

  test(' test created function', () => {
    const reducer = jest.fn();
    const state: State = {};

    const middlewareFuncOne = jest.fn().mockReturnValue(jest.fn());
    const middlewareFuncTwo = jest.fn().mockReturnValue(jest.fn());

    const createStore = applyMiddleware(middlewareFuncOne, middlewareFuncTwo);
    const storeCreator = jest.fn().mockReturnValue({
      dispatch: jest.fn(),
    });

    const store = createStore(storeCreator);
    store(reducer, state, jest.fn());
    expect(middlewareFuncOne).toBeCalledTimes(1);
    expect(middlewareFuncTwo).toBeCalledTimes(1);
    expect(1).toEqual(1);
  });
});
