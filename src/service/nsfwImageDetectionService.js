const jpeg = require("jpeg-js");
const tf = require("@tensorflow/tfjs-node");
const nsfw = require("nsfwjs");
const { resize } = require("../utils/imageUtils");
const { NSFW_TYPES } = require("../constants/nsfwConstants");

const model = nsfw.load();

const createImgTensors = async (img) => {
    const imgResized = await resize(img);
    const finalImage = jpeg.decode(imgResized, true);

    const numChannels = 3;
    const numPixels = finalImage.width * finalImage.height;
    const values = new Int32Array(numPixels * numChannels);

    for (let pixel = 0; pixel < numPixels; pixel++)
        for (let channel = 0; channel < numChannels; ++channel)
            values[pixel * numChannels + channel] = finalImage.data[pixel * 4 + channel];

    return tf.tensor3d(values, [finalImage.height, finalImage.width, numChannels], "int32");
};

const analyzeImage = async (buffer) => {
    try {
        const imgTensors = await createImgTensors(buffer);
        const predictions = await (await model).classify(imgTensors);
        imgTensors.dispose();

        predictions.forEach(({ fixed, probability }) => {
            fixed = `${(probability * 100).toFixed(2)}%`;
        });

        const result = {
            nsfw: NSFW_TYPES.includes(predictions[0].className),
            detail: predictions,
        };

        return result;
    } catch (err) {
        console.error("An error ocurred when try analize images", err);
        throw new Error(err);
    }
};

module.exports = {
    analyzeImage
};

