const mongoose = require ('mongoose')
if (process.argv.length<3) {
    console.log('Le faltan parametros');
    //<obligatorio>
    console.log('node mongo2.js <password>'); 
    process.exit(1) 
}

const password = process.argv[2]

const url = `mongodb+srv://Eduardo:${password}@cluster0.xfvgkw4.mongodb.net/?appName=appNote`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema ({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


Note.find({}).then(result =>{
    result.forEach (x=>{
        console.log(x);

        
    })
    mongoose.connection.close()
})
    