// Megan Rochella - 0706022210028
// ISSG W10 - BRUTE FORCE

const crypto = require('crypto');

// Target hash of Alice's PIN
const targetHash = '5531a5834816222280f20d1ef9e95f69';

// Function to generate MD5 hash
function md5Hash(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

// Brute force attack to find the PIN
function bruteForcePin() {
    for (let pin = 0; pin <= 9999; pin++) {
        // Format pin to be 4 digits
        const pinString = pin.toString().padStart(4, '0');
        // Generate hash of the PIN
        const hash = md5Hash(pinString);

        // Check if the hash matches the target
        if (hash === targetHash) {
            return pinString; // Return the found PIN
        }
    }
    return null; // Return null if no PIN is found
}

// Find Alice's PIN
const alicePin = bruteForcePin();
if (alicePin) {
    console.log(`Alice's PIN is: ${alicePin}`);
} else {
    console.log('PIN not found.');
}
