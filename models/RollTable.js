import mongoose from 'mongoose';

const RollTableSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, unique: true },
        items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    },
    { timestamps: true }
);

const RollTable =
    mongoose.models.RollTable || mongoose.model('RollTable', RollTableSchema);

export default RollTable;
