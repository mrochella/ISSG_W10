// Megan Rochella - 0706022210028
// ISSG W10 - DICTIONARY

const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

// Bob's password hash
const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';

// Function to generate MD5 hash
function md5Hash(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

// Dictionary attack
async function dictionaryAttack(dictionaryFile) {
    const fileStream = fs.createReadStream(dictionaryFile);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const word of rl) {
        const hash = md5Hash(word);
        if (hash === targetHash) {
            return word; // Return the matching word
        }
    }
    return null; // Return null if no match is found
}

// Main function
(async () => {
    const dictionaryFile = 'dictionary.txt'; // Replace with the path to the downloaded file
    console.log('Starting dictionary attack...');

    const password = await dictionaryAttack(dictionaryFile);
    if (password) {
        console.log(`Bob's password is: ${password}`);
    } else {
        console.log('Password not found in the dictionary.');
    }
})();
