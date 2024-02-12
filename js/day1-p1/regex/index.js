const fs = require('fs');

const re_pattern = /(?:^[a-z]*(\d).*(\d)[a-z]*$)|(\d)/;

function lineToNumber(lineString) {
    let match = re_pattern.exec(lineString);
    
    if (!match) {
        return 0;
    }

    if (match[3]) {
        let number = parseInt(match[3]);
        return number*10 + number;
    }

    return parseInt(match[1])*10 + parseInt(match[2]);

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