type Guide = {
  [key: string]: number;
}

const guide: Guide = {
  'AX': 3,
  'AY': 4,
  'AZ': 8,

  'BX': 1,
  'BY': 5,
  'BZ': 9,

  'CX': 2,
  'CY': 6,
  'CZ': 7,
}

function solution(strategy: string) {
  return strategy.split('\n').reduce((total: number, round: string) => {
    const match = round.replace(' ', '');
    return total + guide[match];
  }, 0)
}
