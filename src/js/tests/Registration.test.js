import Registration from '../models/Registration';

const memberWithSpouse = {
  memberName: 'Leonardo',
  hasSpouse: true,
  spouseName: 'Mafe'
};
const memberWithoutSpouse = {
  memberName: 'Leonardo',
  hasSpouse: false,
  spouseName: 'Mafe'
};

const { memberName, hasSpouse, spouseName } = memberWithSpouse;
const { memberNameNs, hasSpouseNs, spouseNameNs } = memberWithoutSpouse;

describe('Registration Model', () => {
  it('If member has spouse - member and spouse habe to be registered', () => {
    const register = new Registration();

    const registeredMember = register.registerNewMember(
      memberName,
      hasSpouse,
      spouseName
    );
    expect(registeredMember.length).toEqual(2);
  });

  it('If member doesnt have spouse - onlye member has to be registered', () => {
    const register = new Registration();

    const registeredMember = register.registerNewMember(
      memberNameNs,
      hasSpouseNs,
      spouseNameNs
    );
    expect(registeredMember.length).toEqual(1);
  });
});
