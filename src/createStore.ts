import { Store } from './Store';
import { Reducer, State } from './types';

export type Enhancer = (store: Store) => Store;

export function createStore(
  reducer: Reducer<State>,
  preloadedState?: State,
  middlewares?: Enhancer[]
): Store {
  let store = new Store(preloadedState, reducer);
  if (middlewares) {
    for (let i = 0; i < middlewares.length; i++) {
      store = middlewares[i](store);
    }
  }
  return store;
}
