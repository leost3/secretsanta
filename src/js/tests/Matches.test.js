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
const draws = matches.assignSantas();

it('member can not draw spouse or him/herself', () => {
  expect(draws.length).toEqual(membersNames.length);
});
it('member can not draw spouse or him/herself', () => {
  const member = draws.find(draw => draw.santa === 'Lidia');
  expect(member.picks).not.toBe('Louis');
});
it('member can not draw spouse or him/herself', () => {
  const member = draws.find(draw => draw.santa === 'Mila');
  expect(member.picks).not.toBe('Igor');
});
