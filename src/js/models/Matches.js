export const match = class Match {
  constructor(memberAndSpouse, spouse) {
    this.memberAndSpouse = memberAndSpouse;
    this.spouse = spouse;
    this.matches = {};
    // this.membersAndSpouses = membersAndSpouses;
    // this.members = members;
  }

  drawMatches() {
    const newArr = this.spouse;
    const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
    //
    let shuffledArray = shuffleArray(newArr);
    // console.log('sortedArr', shuffledArray);

    const spousesDrawn = (shuffledArray, member) => {
      const pairs = [];
      for (let i = 0; i < shuffledArray.length - 1; i += 2) {
        pairs.push([shuffledArray[i], shuffledArray[i + 1]]);
      }
      const isCouple = [];
      pairs.forEach(pair => {
        const isPair = member.find(
          member => JSON.stringify(member) === JSON.stringify(pair)
        );
        if (isPair !== undefined) isCouple.push(isPair);
      });
      return isCouple;
    };
    // console.log(spousesDrawn(shuffledArray, this.memberAndSpouse).length);
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
    // this.addMatchesToLocalStorage();
    return matches;
  }

  shuffleArr(arr) {
    arr.sort(() => Math.random() - 0.5);
  }

  addMatchesToLocalStorage() {
    localStorage.setItem('matches', JSON.stringify(this.matches));
  }

  retrieveMatchesFromLocalStorage() {
    const storage = JSON.parse(localStorage.getItem('matches'));
    if (storage) this.matches = storage;
  }
};
