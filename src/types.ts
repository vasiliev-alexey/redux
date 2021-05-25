export type State = Record<string, unknown>;
export type Action = { type: string; payload: unknown };
export type Listener = (state: State) => void;

export type Reducer<S extends State> = <A extends Action>(
  state: S,
  action: A
) => S;

export interface Reducers {
  [key: string]: Reducer<State>;
}
