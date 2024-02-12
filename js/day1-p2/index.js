const fs = require("fs");

const numbersInString = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

// Time: O(n)
const getFirstNumber = (lineString) => {
  // Time: O(n)
  for (let i = 0; i < lineString.length; i++) {
    let thisChar = lineString.charAt(i);
    let potentialNumber = parseInt(thisChar);

    // first number met is a digit
    if (!isNaN(potentialNumber)) {
      return potentialNumber;
    }

    let thisSubString = lineString.substring(0, i + 1);

    // check if thisSubString ends with any of the items in numbersInString array
    // Time: O(numbersInString.length) = 10
    for (let j = 0; j < numbersInString.length; j++) {
      // Time: O(max string lenght of the items in numbersInString) ~= 5
      if (thisSubString.endsWith(numbersInString[j])) {
        return j + 1;
      }
    }
  }
  // the input string doesn't contain any number, I'll return 0
  return 0;
};

// Time: O(n)
const getLastNumber = (lineString) => {
  // Time: O(n)
  for (let i = lineString.length - 1; i >= 0; i--) {
    const thisChar = lineString.charAt(i);
    const potentialNumber = parseInt(thisChar);

    // first number met is a digit
    if (!isNaN(potentialNumber)) {
      return potentialNumber;
    }

    const thisSubString = lineString.substring(i, lineString.length);

    // check if thisSubString ends with any of the items in numbersInString array
    // Time: O(numbersInString.length) = 10
    for (let j = 0; j < numbersInString.length; j++) {
      // Time: O(max string lenght of the items in numbersInString) ~= 5
      if (thisSubString.startsWith(numbersInString[j])) {
        return j + 1;
      }
    }
  }
  // the input string doesn't contain any number, I'll return 0
  return 0;
};

(() => {
  var args = process.argv.slice(2);
  const inputFile = args[0];

  fs.readFile(inputFile, "utf-8", (err, data) => {
    if (err) throw err;

    const output = data
      .trim()
      .split("\n")
      .map((line) => getFirstNumber(line) * 10 + getLastNumber(line))
      .reduce((acc, curr) => acc + curr);

    console.log(output);
  });
})();
