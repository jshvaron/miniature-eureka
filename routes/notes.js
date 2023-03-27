const express = require('express');
const path = require('path');
const router = express.Router();
const notesData = require('../db/db.json')



// set route for notes.html
router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/notes.html')));



module.exports = router