/**
 * @param fullName The entire name to be split up in first name and last name.
 * @returns [firstName, lastName] - i.e.: fullName = 'Alexandru Eugen Toma' => ['Alexandru Eugen', 'Toma']
 */
export default function splitName(fullName: string): [string, string] {
  let allNames = fullName.split(' ');
  return [
    allNames.slice(0, allNames.length - 1).join(' '),
    allNames[allNames.length - 1],
  ];
}
