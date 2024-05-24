const PDFMerger = require('pdf-merger-js');

const merger = new PDFMerger();

const pdfMerger = async (p1, p2, id) => {
    console.log('Merging files:', p1, p2);
    await merger.add(p1);
    await merger.add(p2);
    await merger.save(`public/${id}_merged.pdf`);
    console.log(`Merged PDF saved as public/${id}_merged.pdf`);
};

module.exports = { pdfMerger };
