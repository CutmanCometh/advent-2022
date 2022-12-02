// I was trying to be performant and it's hideous
function solutionOne(calorieList: string): number {
  let numberString: string = '';
  let elfTotal: number = 0;
  let biggestTotals: number[] = [0, 0, 0];

  for (let i = 0; i < calorieList.length; i++) {
    const char = calorieList[i];
    if (char !== '\n') {
      numberString += char;
    } else {
      if (numberString) {
        elfTotal += Number(numberString);
        numberString = '';
      } else {
        checkLeaderboard(biggestTotals, elfTotal);
        elfTotal = 0;
      }
    }
  }

  elfTotal += Number(numberString);
  checkLeaderboard(biggestTotals, elfTotal);

  return biggestTotals.reduce((finalTotal, singleTotal) => finalTotal + singleTotal, 0);
}

function checkLeaderboard(leaderBoard: number[], check: number) {
  let compare = check;
  for (let j = 0; j < 3; j++) {
    if (compare > leaderBoard[j]) {
      let old = leaderBoard[j];
      leaderBoard[j] = compare;
      compare = old;
    }
  }
}

// Wrote this after to see if it was possible in one line
function solutionTwo(calorieList: string) {
  return calorieList.split('\n\n').map((chunk) => chunk.split('\n').reduce((a, b) => Number(a) + Number(b), 0)).sort((a, b) => a > b ? -1 : 1).slice(0, 3).reduce((a, b) => a + b, 0);
}
