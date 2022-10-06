import { authedSession } from 'lib/api/utils';
import RollTable from 'models/RollTable';

export default authedSession({
    post: async (req, res) => {
        const { title } = req.body;
        const rollTable = await RollTable.create({ title });

        res.status(200).send(rollTable);
    },
    put: async (req, res) => {
        const { tableId, title } = req.body;

        const rollTable = await RollTable.findById(tableId);

        rollTable.title = title;

        await rollTable.save();

        res.status(200).send(rollTable);
    },
    get: async (req, res) => {
        res.status(200).send(
            await RollTable.find({})
                .sort({ createdAt: -1 })
                .populate('items', null, null, { sort: { title: -1 } })
                .lean()
        );
    },
    delete: async (req, res) => {
        const { tableId } = req.body;

        await RollTable.deleteOne({ _id: tableId });

        res.status(200).send();
    },
});
