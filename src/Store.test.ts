import { Store } from './Store';

describe('Store must be class', () => {
  it('constructor test', () => {
    expect(Store).toBeInstanceOf(Function);
    expect(new Store()).toBeInstanceOf(Store);
  });
});
