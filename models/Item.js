import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        adminDescription: { type: String, select: false, trim: true },
        image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    },
    { timestamps: true }
);

ItemSchema.index(
    { title: 1, description: 1, adminDescription: 1 },
    { unique: true }
);

const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);

export default Item;
