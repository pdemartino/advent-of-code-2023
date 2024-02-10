const fs = require('fs');

const config = {
    red: {
        max: 12
    },
    green: {
        max: 13
    },
    blue: {
        max: 14
    }
}

function lineToGame(line) {
    
    //Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    // line is a string, split it on first : occurrence
    let parts = line.split(':');
    let gameId = parseInt(parts[0].split(' ')[1]);
    
    let gameSets = parts[1].split(';'); // ["3 blue, 4 red", "1 red, 2 green, 6 blue", "2 green"]

    let max = {
        red: 0,
        green: 0,
        blue: 0
    }
    for (var i = 0; i < gameSets.length; i++) {
        let gameSet = gameSets[i].trim();
        let colors = gameSet.split(',');
        for (var j = 0; j < colors.length; j++) {
            let colorParts = colors[j].trim().split(' ');
            let colorName = colorParts[1];
            let colorCount = parseInt(colorParts[0]);
            if (colorCount > max[colorName]) {
                max[colorName] = colorCount;
            }
        }
    }

    return {
        id: gameId,
        max: max
    }
}

(function main() {

    var args = process.argv.slice(2);
    const inputFile = args[0];

    fs.readFile(inputFile, 'utf8', function(err, data) {
        if (err) throw err;
        var lines = data.trim().split('\n');

        const sum = lines.map(function(line) {
            return lineToGame(line);
        }).filter(function(game) {
            return game.max.red <= config.red.max && game.max.green <= config.green.max && game.max.blue <= config.blue.max;
        }).map(function(game) {
            return game.id;
        }).reduce(function(acc, val) {
            return acc + val;
        }, 0);

        console.log(sum);
    });
    
})();
