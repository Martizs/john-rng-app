import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    adminDescription: { type: String, select: false },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
});

const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);

export default Item;
