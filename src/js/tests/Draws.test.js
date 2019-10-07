import Draw from '../models/Draws';
import Match from '../models/Matches';

const membersAndSpouses = [
  ['Louis', 'Lidia'],
  ['Camille', 'Jorge'],
  ['Mila', 'Igor'],
  ['Guillome', null],
  ['Maria', null]
];

const membersNames = [
  'Louis',
  'Lidia',
  'Camille',
  'Mila',
  'Igor',
  'Guillome',
  'Maria'
];

const matches = new Match(membersAndSpouses, membersNames);
const drawns = matches.assignSantas();
const findDrawns = new Draw(drawns);

describe('Draw Model', () => {
  it('member can not draw spouse or him/herself', () => {
    const myDraw = findDrawns.findDraw('Louis');

    expect(myDraw.picks).not.toBe('Louis');
    expect(myDraw.picks).not.toBe(' Lidia');
  });

  it('member can not draw spouse or him/herself', () => {
    const myDraw = findDrawns.findDraw('Camille');
    expect(myDraw.picks).not.toBe('Camille');
    expect(myDraw.picks).not.toBe('Jorge');
  });

  it('member can not draw spouse or him/herself', () => {
    const myDraw = findDrawns.findDraw('Mila');

    expect(myDraw.picks).not.toBe('Mila');
    expect(myDraw.picks).not.toBe('Igor');
  });

  it('santa cannot pick himself', () => {
    const myDraw = findDrawns.findDraw('Guillome');

    expect(myDraw.picks).not.toBe('Guillome');
  });
  it('santa cannot pick himself', () => {
    const myDraw = findDrawns.findDraw('Maria');
    expect(myDraw.picks).not.toBe('Maria');
  });
});
