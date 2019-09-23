import { getGameState } from './gameService';
['X', 'O'].forEach(symbol => {
  test(`${symbol} should win for first row`, () => {
    // eslint-disable-next-line
    const board = [[symbol, symbol, symbol], ['', '', ''], ['', '', '']];

    expect(getGameState(board)).toBe(symbol);
  });

  test(`${symbol} should win for second row`, () => {
    // eslint-disable-next-line
    const board = [['', '', ''], [symbol, symbol, symbol], ['', '', '']];

    expect(getGameState(board)).toBe(symbol);
  });

  test(`${symbol} should win for third row`, () => {
    // eslint-disable-next-line
    const board = [['', '', ''], ['', '', ''], [symbol, symbol, symbol]];

    expect(getGameState(board)).toBe(symbol);
  });

  test(`${symbol} should win for first Column`, () => {
    // eslint-disable-next-line
    const board = [[symbol, '', ''], [symbol, '', ''], [symbol, '', '']];

    expect(getGameState(board)).toBe(symbol);
  });

  test(`${symbol} should win for second Column`, () => {
    // eslint-disable-next-line
    const board = [['', symbol, ''], ['', symbol, ''], ['', symbol, '']];

    expect(getGameState(board)).toBe(symbol);
  });

  test(`${symbol} should win for third column`, () => {
    // eslint-disable-next-line
    const board = [['', '', symbol], ['', '', symbol], ['', '', symbol]];

    expect(getGameState(board)).toBe(symbol);
  });

  test(`${symbol} should win for 45 Cross`, () => {
    // eslint-disable-next-line
    const board = [['', '', symbol], ['', symbol, ''], [symbol, '', '']];

    expect(getGameState(board)).toBe(symbol);
  });

  test(`${symbol} should win for 35 Cross`, () => {
    // eslint-disable-next-line
    const board = [[symbol, '', ''], ['', symbol, ''], ['', '', symbol]];

    expect(getGameState(board)).toBe(symbol);
  });
});

test('should have no winner (unfinished game)', () => {
  // eslint-disable-next-line
  const board = [['X', '', ''], ['', '', ''], ['', '', '']];
  expect(getGameState(board)).toBe('');
});

test('should have no winner (Tie)', () => {
  // eslint-disable-next-line
  const board = [['X', 'X', 'O'], ['O', 'X', 'X'], ['X', 'O', 'O']];
  expect(getGameState(board)).toBe('T');
});
