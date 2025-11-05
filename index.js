const express = require("express")
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
//imports en backend
//para los logger se usa un next
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('Body', request.body);
    console.log('----------------');
    next()
 
}
 
app.use(requestLogger)
 
let notes = [
    {
        id:1,
        content:"HTML is easy",
        important: true
    },
    {
        id:2,
        content:"Browser can execute only JavaScrip",
        important: false
    },
    {
        id:3,
        content:"GET & POST are the most important methods of HTTP Protocols",
        important: true
    }
]
//Imports
 
app.get('/api/notes/', (request, response)=>{
    response.json(notes)
})
 
app.get('/api/notes/:id', (request, response)=>{
    const id = Number(request.params.id)
    const note = notes .find (x => x.id === id)
    if (note){
        response.json(note)
    }
    else {
        response.status(404).end()
    }
})
//dos de delate
app.delete('/api/notes/:id', (request, response)=>{
    const id = Number(request.params.id)
    notes = notes.filter(x => x.id !== id) //Solo estamos simulando el borrado
    console.log('Delete', id);
    response.status(204).end()
 
})
//dos de post
app.post('/api/notes', (request, response)=>{
    const note = request.body
    if (note.content) {
    note.id = notes.length + 1
    notes = notes.concat(note)
    response.json(note)
    console.log('Adding:', note);
    }
    else{
        response.status(400).json({error: 'content is missing'})
    }
})
 
const badPath = (request, response, next) => {
    response.status(404).send({error: 'Ruta desconocida'})
}
app.use(badPath)
 //Para que el provedor le damos la opcion que elija el puerto
const PORT = process.env.PORT || 3001
 
 
app.listen(PORT, ()=>{
    console.log(`Server running in port ${PORT}`);
    
})