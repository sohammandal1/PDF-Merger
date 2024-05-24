const express = require('express');
const path = require('path');
const multer = require('multer');
const uniqid = require('uniqid');
const { pdfMerger } = require('./merger.js');

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.use("/static", express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
    const id = uniqid();
    console.log('Uploaded files:', req.files);

    if (req.files.length !== 2) {
        return res.status(400).send('You must upload exactly 2 PDF files.');
    }

    const file1Path = req.files[0].path;
    const file2Path = req.files[1].path;

    console.log('File paths:', file1Path, file2Path);

    await pdfMerger(file1Path, file2Path, id);
    res.redirect(`/static/${id}_merged.pdf`);
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
