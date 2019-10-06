import Draw from './Draws';
import Registration from './Registration';
import { match } from './Matches';

const membersAndSpouses = [
  ['leo', 'mafe'],
  ['jojo', 'gabs'],
  ['payjay', 'amanda'],
  ['fran', null],
  ['gui', null]
];

const membersNames = [
  'leo',
  'mafe',
  'jojo',
  'gabs',
  'paijay',
  'amanda',
  'fran',
  'gui'
];

const matches = new match(membersAndSpouses, membersNames);
const drawns = matches.drawMatches();

const findDrawns = new Draw(drawns);

it('member can not draw spouse or him/herself', () => {
  const myDraw = findDrawns.findDraw('leo');

  expect(myDraw.picks).not.toBe('leo');
  expect(myDraw.picks).not.toBe('mafe');
});

it('member can not draw spouse or him/herself', () => {
  const myDraw = findDrawns.findDraw('jojo');

  expect(myDraw.picks).not.toBe('jojo');
  expect(myDraw.picks).not.toBe('gabs');
});

it('member can not draw spouse or him/herself', () => {
  const myDraw = findDrawns.findDraw('amanda');

  expect(myDraw.picks).not.toBe('amanda');
  expect(myDraw.picks).not.toBe('paijay');
});

// it('the picker cannot pick himself or wife', () => {
// expect(myDraw.picks).not.toBe('fran');
// expect(myDraw.picks).not.toMatch(/mafe/);
// });
