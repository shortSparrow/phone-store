const express = require("express");
const config = require('config');
const mongoose = require("mongoose");
cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json({ extented: true })); // что бы body было не undefined, а объекьтом с полями {}

app.use("/public", express.static("public"));

app.use('/api/auth', require('./routes/auth.routes'))

app.use('/api/phone', require('./routes/phone.routes'))
app.use('/api/tablet', require('./routes/tablets.routes'))

// app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});



const PORT = process.env.PORT || config.get('port') || 5000

// const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => console.log(`Listren server on ${PORT}`))
    } catch (err) {
        console.log("Server Error", err.message);
        process.exit()
    }
}

start();