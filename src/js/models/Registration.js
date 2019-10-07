export default class Registration {
  constructor() {
    this.registeredMembers = [];
  }

  registerNewMember(memberName, hasSpouse, spouseName) {
    // Checks if registered member is already on registeredMembers array (It;s filled when app runs by saved items on localstorage)
    if (
      !this.registeredMembers.filter(member => member.memberName === memberName)
        .length
    ) {
      if (hasSpouse) {
        const familyMember = {
          memberName,
          hasSpouse,
          spouseName
        };
        const spouse = {
          memberName: spouseName,
          hasSpouse,
          spouseName: memberName
        };
        this.registeredMembers.push(familyMember, spouse);
      } else {
        const familyMember = {
          memberName,
          hasSpouse,
          spouseName
        };
        this.registeredMembers.push(familyMember);
      }
      this.addMemberToLocalStorage();
    } else {
      const memberAlreadyExists = true;
      return memberAlreadyExists;
    }
  }

  addMemberToLocalStorage() {
    localStorage.setItem('members', JSON.stringify(this.registeredMembers));
  }

  retrieveParticipantsFromLocalStorate() {
    const storage = JSON.parse(localStorage.getItem('members'));
    if (storage) this.registeredMembers = storage;
  }
}
