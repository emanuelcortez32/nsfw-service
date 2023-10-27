const sharp = require('sharp');

const resize = async (inputBuffer) => {
    try {
        const { buffer } = await sharp(inputBuffer).resize(320,240).jpeg({ mozjpeg: true }).toBuffer();
        return buffer; 
    } catch (error) {
        console.error("A error ocurred when try resize image", error);
        throw new Error(err);
    }
}

module.exports = { 
    resize
}