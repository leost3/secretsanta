export const match = class Match {
  constructor(memberAndSpouse, members) {
    this.memberAndSpouse = memberAndSpouse;
    this.members = members;
    this.matches = {};
  }

  assignSantas() {
    const membersArr = this.members;
    const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
    let shuffledArray = shuffleArray(membersArr);

    // Checks if spouses were side by side in the array
    const spousesDrawn = (shuffledArray, members) => {
      const pairs = [];
      const isCouple = [];
      for (let i = 0; i < shuffledArray.length - 1; i += 2) {
        pairs.push([shuffledArray[i], shuffledArray[i + 1]]);
      }
      pairs.forEach(pair => {
        const isPair = members.find(
          member => JSON.stringify(member) === JSON.stringify(pair)
        );
        if (isPair !== undefined) isCouple.push(isPair);
      });
      return isCouple;
    };

    // While in the shuffled array spouses are still paired, array will be shuffled again
    while (spousesDrawn(shuffledArray, this.memberAndSpouse).length) {
      shuffledArray = shuffleArray(shuffledArray);
      if (!spousesDrawn(shuffledArray, this.memberAndSpouse).length) break;
    }

    const matches = shuffledArray.map((arr, i) => {
      if (i === shuffledArray.length - 1) i = -1;
      return {
        santa: arr,
        picks: shuffledArray[i + 1]
      };
    });

    // console.log('-----------------------------------------------------------');
    // console.log('finalSortedArr', shuffledArray);
    // console.log('->', spousesDrawn(shuffledArray, this.memberAndSpouse).length);
    // console.log('FinalMatch', matches);
    // console.log('-----------------------------------------------------------');
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
};
