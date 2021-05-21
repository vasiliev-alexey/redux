import { createStore, Enhancer } from './createStore';
import { State, Reducer } from './types';
import { Store } from './Store';

describe('test create store', () => {
  it('createStore is a function', () => {
    expect(createStore).toBeInstanceOf(Function);
  });

  it('createStore has preload state param', () => {
    const preState: State = {
      name: 'name',
    };
    const reducer: Reducer = {};

    const store = createStore(reducer, preState);
    expect(store).toBeInstanceOf(Store);
  });

  it('createStore has middlewares   param', () => {
    const preState: State = {
      name: 'name',
    };
    const reducer: Reducer = {};

    const midlewareMock = jest.fn();

    const midls: Enhancer[] = [];
    midls.push(midlewareMock);

    const store = createStore(reducer, preState, midls);
    expect(store).not.toBeNull();
    expect(midlewareMock).toHaveBeenCalledTimes(1);
  });
});
