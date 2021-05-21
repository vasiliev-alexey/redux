export type State = Record<string, unknown>;
export type Reducer = Record<string, Function>;
export type Action = { type: string; payload: unknown };
export type Listener = (state: State) => void;
