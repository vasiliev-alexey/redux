import { Action, Reducers, State } from './types';

export function combineReducers<S, A>(reducersMap?: {
  [key: string]: Function;
}): Function {
  return function combinationReducer(state: State = {}, action: Action) {
    const nextState: { [key: string]: unknown } = {};

    if (!reducersMap) {
      return state;
    }

    Object.entries(reducersMap).forEach(([key, reducer]) => {
      nextState[key] = reducer(state[key], action);
    });
    return nextState;
  };
}
