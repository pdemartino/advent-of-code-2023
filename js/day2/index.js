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
    
    // line = "Game <gameId>: <gameSet1>; <gameSet2>; <gameSet3>; ...; <gameSetN>"
    // where gameSet = "<count> <color>, <count> <color>, ... <count> <color>"
    // Each set can have a number of dices of each color, I'll take the max of each color

    const lineParts = line.split(':');
    const gameId = parseInt(lineParts[0].split(' ')[1]);
    const gameSets = lineParts[1].split(';'); // eg: ["3 blue, 4 red", "1 red, 2 green, 6 blue", "2 green"]

    let max = {
        red: 0,
        green: 0,
        blue: 0
    }

    gameSets
        .flatMap(gameSet => gameSet.split(','))
        .map(colorInstance => {
            let colorParts = colorInstance.trim().split(' ');
            return {
                color: colorParts[1],
                count: parseInt(colorParts[0])
            }
        }).forEach(colorInstance => {
            max[colorInstance.color] = Math.max(max[colorInstance.color], colorInstance.count);
        });

    return {
        id: gameId,
        max: max
    }
}

const linesToSum = (lines) => lines
    .map(line => lineToGame(line))
    .filter(game => (game.max.red <= config.red.max && game.max.green <= config.green.max && game.max.blue <= config.blue.max ))
    .map(game => game.id)
    .reduce((acc, val) => acc + val, 0);

(function main() {

    var args = process.argv.slice(2);
    const inputFile = args[0];

    fs.readFile(inputFile, 'utf8', function(err, data) {
        if (err) throw err;
        console.log(linesToSum(data.trim().split('\n')));
    });
    
})();
