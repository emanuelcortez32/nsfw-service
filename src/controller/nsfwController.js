const { BASE64_JPEG } = require('../constants/imageConstants');
const { analyzeImage } = require('../service/nsfwImageDetectionService');

const validBase64Types = [BASE64_JPEG]

const isValidBase64Image = (base64String) => validBase64Types.includes(base64String[0]);

const nsfwController = async (req, res) => {
    try {
        console.log(req.headers);
        let bufferImg;
        if (req.is('multipart/form-data')) {
            const { file } = req;
            if (!file)
                return res
                    .status(400)
                    .json({ message: "Missing file multipart/form-data" });

            bufferImg = file.buffer;
        } else if(req.is('application/json')) {
            const { base64img } = req.body;
            if(!isValidBase64Image(base64img)) 
                return res
                    .status(400)
                    .json({ message : "Invalid MIME type"})

            bufferImg = Buffer.from(base64img, "base64");
        } else {
            return res.status(400).json({ message : "Content-Type must be application/json or multipart/form-data"});
        }

        const predictions = await analyzeImage(bufferImg);
        return res.status(200).json(predictions);
    } catch (err) {
        return res.status(500).json({ message : "Generic Error"});
    }
}

module.exports = {
    nsfwController
}