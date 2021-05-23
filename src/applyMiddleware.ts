// applyMiddleware.js
import { Store } from './Store';
import { Action, Reducer, State } from './types';

export default function applyMiddleware(...middlewares: Function[]): Function {
  return (createStore: Function) =>
    (reducer: Reducer, preloadedState: State, enhancer: Function[]) => {
      const store: Store = createStore(reducer, preloadedState, enhancer);
      let dispatch: Function = store.dispatch;
      let chain: Function[];

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action: Action) => dispatch(action),
      };
      chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose(...chain)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
}

function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return (arg: unknown) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  const last = funcs[funcs.length - 1];
  const rest = funcs.slice(0, -1);
  return (...args: unknown[]) =>
    rest.reduceRight((composed, f) => f(composed), last(...args));
}
