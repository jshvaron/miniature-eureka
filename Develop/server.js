const express = require('express');
//sets port to 3001
const PORT  = 3001;
const app = express();
const path = require('path')


//allows us to use static files in the public folder 
app.use(express.static('public'));
//setting main route
app.get('/', (req, res) => res.send ('Navigate to notes'));

//GET * should return the index.html file.
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../Develop/public/index.html'))
})



//imports /notes router
const notesRouter = require('./routes/notes')
    app.use('/notes', notesRouter)


//logs if the server is working
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);