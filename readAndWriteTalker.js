const fs = require('fs').promises;

const ARQUIVO = 'talker.json';

async function readTalkers() {
  try {
    const talkers = await fs.readFile(ARQUIVO, 'utf-8');
    return JSON.parse(talkers);
  } catch (err) {
    console.error(err);
  }
}

async function writeTalkers(data) {
  fs.writeFile(ARQUIVO, JSON.stringify(data));
}

module.exports = {
  readTalkers,
  writeTalkers,
};