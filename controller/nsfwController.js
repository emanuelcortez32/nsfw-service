const { analyzeImage } = require('../service/nsfwImageDetectionService');

const nsfwController = async (req, res) => {
    try {
        const { file } = req;
        if (!file)
            return res
                .status(400)
                .json({ message: "Missing file multipart/form-data" });

        const predictions = await analyzeImage(file.buffer);
        return res.status(200).json(predictions);
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    nsfwController
}