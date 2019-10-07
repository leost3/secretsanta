export default class Match {
  constructor(memberAndSpouse, members) {
    this.memberAndSpouse = memberAndSpouse;
    this.members = members;
    this.matches = {};
  }

  assignSantas() {
    const membersArr = [...this.members];
    const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
    let membersArrayShuffled = shuffleArray(membersArr);

    // Divide members array in pairs and checks if spouses were side by side in the array
    const checkIfSpousesDrawnEachOther = (membersArrayShuffled, members) => {
      const pairs = [];
      const isCouple = [];

      for (let i = 0; i < membersArrayShuffled.length - 1; i += 2) {
        pairs.push([membersArrayShuffled[i], membersArrayShuffled[i + 1]]);
      }
      pairs.push([
        membersArrayShuffled[membersArrayShuffled.length - 1],
        membersArrayShuffled[0]
      ]);

      if (members.length % 2 > 0) {
        pairs.push([
          membersArrayShuffled[membersArrayShuffled.length - 2],
          membersArrayShuffled[membersArrayShuffled.length - 1]
        ]);
      }

      pairs.forEach(pair => {
        const isPair = members.find(
          member => JSON.stringify(member) === JSON.stringify(pair)
        );
        if (isPair !== undefined) isCouple.push(isPair);
      });

      if (isCouple.length > 0) {
        return true;
      }
      return false;
    };
    // While in the shuffled array spouses are still paired, array will be shuffled again
    while (
      checkIfSpousesDrawnEachOther(membersArrayShuffled, this.memberAndSpouse)
    ) {
      membersArrayShuffled = shuffleArray(membersArrayShuffled);
      if (
        !checkIfSpousesDrawnEachOther(
          membersArrayShuffled,
          this.memberAndSpouse
        )
      )
        break;
    }

    const matches = membersArrayShuffled.map((arr, i) => {
      if (i === membersArrayShuffled.length - 1) i = -1;
      return {
        santa: arr,
        picks: membersArrayShuffled[i + 1]
      };
    });
    this.matches = matches;
    this.addMatchesToLocalStorage();
    return matches;
  }

  addMatchesToLocalStorage() {
    localStorage.setItem('matches', JSON.stringify(this.matches));
  }

  retrieveMatchesFromLocalStorage() {
    const storage = JSON.parse(localStorage.getItem('matches'));
    if (storage) this.matches = storage;
  }
}
