test('should register a new game', async () => {
  const p1 = 'Yaniv';
  const p2 = 'Eyal';

  await navigate();

  await newGame(p1, p2);

  expect(await getPlayer1Title()).toBe(p1);
  expect(await getPlayer2Title()).toBe(p2);
});

test('should hide game during registration', async () => {
  await navigate();
  expect(await gameVisible()).toBeFalsy();
});

test('should hide registration after game starts', async () => {
  const p1 = 'Yaniv';
  const p2 = 'Eyal';

  await navigate();
  expect(await gameVisible()).toBeFalsy();
  expect(await regestrationVisible()).toBeTruthy();
  await newGame(p1, p2);
  expect(await regestrationVisible()).toBeFalsy();
  expect(await gameVisible()).toBeTruthy();
});

test('should show "X" after first player clicks', async () => {
  const p1 = 'Yaniv';
  const p2 = 'Eyal';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(0);

  expect(await getACellAt(0)).toBe('X');
});

test('should show "O" after second player first clicks', async () => {
  const p1 = 'Yaniv';
  const p2 = 'Eyal';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(0);
  await clickACellAt(1);

  expect(await getACellAt(1)).toBe('O');
});

test('first player should win the game', async () => {
  const p1 = 'Yaniv';
  const p2 = 'Eyal';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(0);
  await clickACellAt(3);
  expect(await hasWinner()).toBeFalsy();
  await clickACellAt(1);
  await clickACellAt(4);
  await clickACellAt(2);

  // await page.screenshot({ path: './sc.png' });
  expect(await getWinner()).toBe(`${p1} won!!!`);
});

test('second player should win the game', async () => {
  const p1 = 'Yaniv';
  const p2 = 'Eyal';

  await navigate();

  await newGame(p1, p2);
  expect(await hasWinner()).toBeFalsy();

  await clickACellAt(0);
  await clickACellAt(3);
  await clickACellAt(1);
  await clickACellAt(4);
  await clickACellAt(6);
  await clickACellAt(5);

  // await page.screenshot({ path: './sc.png' });
  expect(await getWinner()).toBe(`${p2} won!!!`);
});

test('Game should end with Tie', async () => {
  const p1 = 'Yaniv';
  const p2 = 'Eyal';

  await navigate();

  await newGame(p1, p2);
  expect(await gameEndedWithTie()).toBeFalsy();
  await clickACellAt(0);
  await clickACellAt(2);
  await clickACellAt(1);
  await clickACellAt(3);
  await clickACellAt(4);
  await clickACellAt(7);
  await clickACellAt(5);
  await clickACellAt(8);
  await clickACellAt(6);

  expect(await hasWinner()).toBeFalsy();
  expect(await gameEndedWithTie()).toBeTruthy();
});

test('disabled Click on same Cell', async () => {
  const p1 = 'Yaniv';
  const p2 = 'Eyal';

  await navigate();

  await newGame(p1, p2);
  expect(await gameEndedWithTie()).toBeFalsy();
  await clickACellAt(0);
  expect(await getACellAt(0)).toBe('X');
  await clickACellAt(0);
  expect(await getACellAt(0)).toBe('X');
});

test('Show Current player to have color green ', async () => {
  const p1 = 'Yaniv';
  const p2 = 'Eyal';

  await navigate();

  await newGame(p1, p2);
  expect(await gameEndedWithTie()).toBeFalsy();

  expect(await getPlayer1TitleColor()).toBe('green');
  expect(await getPlayer2TitleColor()).toBe('black');
  await clickACellAt(0);
  expect(await getPlayer1TitleColor()).toBe('black');
  expect(await getPlayer2TitleColor()).toBe('green');
});

async function regestrationVisible() {
  return !!(await page.$('[data-testid="registration"]'));
}
async function gameVisible() {
  return !!(await page.$('[data-testid="game"]'));
}
async function gameEndedWithTie() {
  return !!(await page.$('[data-testid="tie"]'));
}

async function hasWinner() {
  return !!(await page.$('[data-testid="winner"]'));
}

async function getWinner() {
  return page.$eval('[data-testid="winner"]', el => el.innerText);
}

async function getACellAt(index) {
  return await page.$$eval('td', (tds, i) => tds[i].innerText, index);
}

async function clickACellAt(index) {
  await page.$$eval(
    'td',
    (tds, i) => {
      return tds[i].click();
    },
    index
  );
}

function getPlayer1TitleColor() {
  return page.$eval(
    '[data-testid="p1-title"]',
    titleElement => titleElement.style.color
  );
}

function getPlayer2TitleColor() {
  return page.$eval(
    '[data-testid="p2-title"]',
    titleElement => titleElement.style.color
  );
}

function getPlayer2Title() {
  return page.$eval(
    '[data-testid="p2-title"]',
    titleElement => titleElement.innerText
  );
}

function getPlayer1Title() {
  return page.$eval(
    '[data-testid="p1-title"]',
    titleElement => titleElement.innerText
  );
}

async function newGame(p1, p2) {
  await page.type('[data-testid="p1-input"]', p1);
  await page.type('[data-testid="p2-input"]', p2);
  await page.click('[data-testid="new-game"]');
}

async function navigate() {
  await page.goto('http://localhost:3000');
}
