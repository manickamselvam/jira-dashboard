const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  res.json({ message: 'Integration access granted', user: req.user });
});

module.exports = router;
