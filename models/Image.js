import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    content: {
        data: Buffer,
        contentType: String,
    },
});

const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

export default Image;
