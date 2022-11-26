const fs = require('fs');
const path = require('path');

function rotateLogs(oldFilename, newFilename) {
    // Copy the old file to the old-logs folder asynchronously
    const src = path.join(__dirname, oldFilename);
    const dest = path.join(__dirname, 'old-logs', path.basename(oldFilename));
    fs.copyFile(src, dest, (err) => {
        if (err) throw err;
        console.log('Rotating the log file');
        console.log(`Old file: ${oldFilename} - New file: ${newFilename}`);
    });
}

module.exports = rotateLogs;