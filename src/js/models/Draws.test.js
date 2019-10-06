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
const myDraw = findDrawns.findDraw('leo');

it('We can check if the consumer called the class constructor', () => {
  expect(myDraw.picks).toMatch(/leo/);
  expect(myDraw.picks).toMatch(/mafe/);
});

// it('the picker cannot pick himself or wife', () => {
// expect(myDraw.picks).not.toBe('fran');
// expect(myDraw.picks).not.toMatch(/mafe/);
// });
