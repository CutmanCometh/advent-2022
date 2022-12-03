function solution(sackString: string) {
  const sacks = sackString.split('\n')
  let total = 0;
  for (let i = 0; i < sacks.length; i += 3) {
    const group = sacks.slice(i, i + 3)
    total += findPriority(group[0], group[1], group[2])
  }
  return total;
}

function findPriority(a: string, b: string, c: string) {
  let check : { [key: string]: string } = {};
  for (let i = 0; i < a.length; i++) {
    check[a[i]] = 'once';
  }
  for (let i = 0; i < b.length; i++) {
    if (check[b[i]] === 'once') {
      check[b[i]] = 'twice';
    }
  }
  for (let i = 0; i < c.length; i++) {
    if (check[c[i]] === 'twice')
      return charPriority(c[i])

  }
  return 0;
}

function charPriority(char: string) {
  if (char.toLowerCase() === char)
    return char.toUpperCase().charCodeAt(0) - 64;
  else
    return char.toLowerCase().charCodeAt(0) - 70;
}
