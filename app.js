const express = require('express');
const nodemon = require('nodemon');
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const sharp = require('sharp');
const fs = require('fs');


const app = express();
const port = process.env.port || 3000;
nodemon[app];

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World with nodemond!'));

app.post('/imagen', upload.single('imagen'), async (req, res) => {
    const imagen = req.file;
    const imgSize = await sharp(imagen['buffer']).resize(880, 800, {
        fit: 'contain',
        background: '#fff'
    }).toBuffer();
    fs.writeFileSync('nuevaruta/prueba.png', imgSize);
    console.log(imgSize);
    res.send({resizeImage: imgSize})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));