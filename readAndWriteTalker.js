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

module.exports = {
  readTalkers,
};