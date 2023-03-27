const express = require('express');

const PORT  = process.env.PORT || 3001;
const app = express();

const path = require('path');
const notesData = require('./db/db.json');
const uuid = require('./helpers/uuid');
const bodyParser = require('body-parser');
const fs = require('fs');


// body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//allows us to use static files in the public folder 
app.use(express.static('public'));
//setting main route
app.get('/', (req, res) => res.send ('Navigate to notes'));


//imports /index router
const indexRouter = require('./routes/index');
    app.use('/',indexRouter);
;


//imports /notes router
const notesRouter = require('./routes/notes');
    app.use('/notes', notesRouter);

;


//read an return from /api in JSON, logs 'I CAN READ'
app.get('/api/notes', (req, res) => {
    res.json(notesData)
    console.info(' I CAN READ')
});


// POST to ^api via JSON
app.post('/api/notes',(req, res) => {
    res.json(`${req.method} request received`)
    console.info('I CAN WRITE')
    //Destructuring note for items
    const {title, text} = req.body;

    if (title && text){
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        //logs new note
        console.log(newNote);
        //read/parse db file,push newNote to db
        const notes = JSON.parse(fs.readFileSync('./db/db.json'));
        notes.push(newNote)
        //writes new note to db
        fs.writeFileSync(`./db/db.json`, JSON.stringify(notes), console.log('I have a good memory!'))

    };

});


// DELETE a note by ID
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
  
    // read/parse db file
    let notes = JSON.parse(fs.readFileSync('./db/db.json'));
  
    // filter out the note with the matching ID
    notes = notes.filter(note => note.id !== id);
  
    // write the updated notes array to the db file
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  
    // send a response back to the client
    res.json({ message: `Note with ID ${id} has been deleted.` });
  });
;


//logs if the server is working
app.listen(PORT , () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);