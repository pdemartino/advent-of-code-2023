// import fs module
const fs = require('fs');


function lineToNumber(lineString) {

    let firstNumber;
    let i = 0;
    while (isNaN(firstNumber = parseInt(lineString.charAt(i))) && (i < lineString.length)) {
        i++;
    }

    let lastNumber;
    i = lineString.length - 1;
    while (isNaN(lastNumber = parseInt(lineString.charAt(i))) && (i >= 0)) {
        i--;
    }

    // handle lines with no numbers
    firstNumber =parseInt(firstNumber) || 0;
    lastNumber = parseInt(lastNumber) || 0;

    var number = firstNumber*10 + lastNumber;
    return number;
}


function main() {
    var args = process.argv.slice(2);
    const inputFile = args[0];

    
    fs.readFile(inputFile, 'utf8', function(err, data) {
        if (err) throw err;
        var lines = data.trim().split('\n');
        let sum = 0;
        for (var i = 0; i < lines.length; i++) {
            sum+= lineToNumber(lines[i])
        }
        console.log(sum);
    });

}

main();
