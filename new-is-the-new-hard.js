#!/usr/bin/env node

var
    fs = require('fs'),
    readline = require('readline'),
    stream = require('stream'),
    regex = /hard/i,
    instream = fs.createReadStream('HARD.md'),
    outstream = new stream,
    rl = readline.createInterface(instream, outstream);

var output = "";

rl.on('line', function(line) {
    var match = regex.exec(line);
    while (match) {
        line = line.slice(0, match.index) + 'new' + line.slice(match.index + match[0].length);
        match = regex.exec(line);
    }
    output += line + "\n";
});


rl.on('close', function() {
    fs.writeFile('NEW.md', output+"\n", function (err) {
        if (err) throw err;
        console.log('Replaced all occurrences of hard with new, file saved!');
    });
});