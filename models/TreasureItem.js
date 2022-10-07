import mongoose from 'mongoose';

const TreasureItemSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true, default: '' },
        image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    },
    { timestamps: true }
);

const TreasureItem =
    mongoose.models.TreasureItem ||
    mongoose.model('TreasureItem', TreasureItemSchema);

export default TreasureItem;
