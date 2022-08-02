function validateName(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) { 
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) { 
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
  }
  next();
}

function validateToken(req, res, next) {
  const token = req.headers.authorization;
  console.log('TESTANDO TOKEN', token);
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  next();
}

function validateWatchedAt(req, res, next) {
  const regexFormatData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  const { watchedAt } = req.body.talk;
  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  if (!regexFormatData.test(watchedAt)) { 
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }
  next();
}

function validateRate(req, res, next) {
  const { rate } = req.body.talk;
  if (rate < 1 || rate > 5 || rate === '') {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  next();
}

module.exports = {
  validateName,
  validateAge,
  validateToken,
  validateTalk,
  validateWatchedAt,
  validateRate,
};