export function getNameAbbreviation(name: string) {
  const [first, second] = name.split(" ");

  if (!second) return first[0];
  return first[0] + second[0];
}
