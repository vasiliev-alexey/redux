## otus_redux_sample

### Quickstart

```shell
npm install @vasiliev-alexey/otus_redux_sample
```

### Basic Usage

```ts
import {
  createStore,
  State,
  Reducer,
  Action,
} from '@vasiliev-alexey/otus_redux_sample';

const reducer: Reducer<State> = (state: State, action: Action): State => {
  const newState: State = action['payload'] as State;

  return newState;
};
const store = createStore(reducer, {});

const simpleAction: Action = {
  type: 'simple',
  payload: {
    val: 1,
  },
};

store.dispatch(simpleAction);

console.log(store.getState());
```
