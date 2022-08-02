const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers, writeTalkers } = require('./readAndWriteTalker');
const generateToken = require('./generateToken');
const {
      validateToken,
      validateName,
      validateAge,
      validateTalk,
      validateWatchedAt, 
      validateRate,
} = require('./validationsTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar 
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await readTalkers();
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkers();
  const talkerById = talkers.find((talker) => talker.id === Number(id));

  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talkerById);
});

app.post('/login', (req, res) => {
  const regexEmail = /\S+@\S+\.\S+/;
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = generateToken();
  return res.status(200).json({ token });
});

app.post('/talker', 
validateToken, 
validateName,
validateAge, 
validateTalk, 
validateWatchedAt, 
validateRate, 
async (req, res) => {
  const { body } = req;
  const talkers = await readTalkers();
  const newID = talkers.length + 1;
  const newTalker = {
    id: newID,
    ...body,
  };
  talkers.push(newTalker);
  await writeTalkers(talkers);
  res.status(201).json(newTalker);
});

app.put('/talker/:id', 
validateToken, 
validateName,
validateAge, 
validateTalk, 
validateWatchedAt, 
validateRate, 
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readTalkers();

  const getIndexTalker = talkers.findIndex((talker) => talker.id === Number(id));
  if (getIndexTalker === -1) return res.status(404).json({ message: 'Talker não encontrado' });

  talkers[getIndexTalker] = { ...talkers[getIndexTalker], name, age, talk };
  await writeTalkers(talkers);
  res.status(200).json(talkers[getIndexTalker]);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkers();
  const getIndexTalker = talkers.findIndex((talker) => talker.id === Number(id));
  if (getIndexTalker === -1) return res.status(404).json({ message: 'Talker não encontrado' });

  const removeTalker = talkers.filter((talker) => talker.id !== Number(id));
  await writeTalkers(removeTalker);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
