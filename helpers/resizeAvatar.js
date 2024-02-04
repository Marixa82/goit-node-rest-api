import Jimp from "jimp";

// const url = "https://upload.wikimedia.org/wikipedia/commons/0/01/Bot-Test.jpg";

// Jimp.read(url)
//     .then((image) => {
//         image.resize(250, 250)
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// function onBuffer(err, buffer) {
//     if (err) throw err;
//     console.log(buffer);
// }
const resizeAvatar = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    try {
        const image = await Jimp.read(req.file.path);
        image.resize(250, 250, Jimp.RESIZE_BEZIER);
        await image.writeAsync(req.file.path);
        next();
    } catch (error) {
        next(error);
    }
};
export default resizeAvatar;