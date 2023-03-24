const express = require('express');
const path = require('path');
const router = express.Router();

// set route for notes.html
router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/notes.html')));


module.exports = router