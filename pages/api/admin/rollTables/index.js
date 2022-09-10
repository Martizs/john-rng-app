import { authedSession } from 'lib/api/utils';
import RollTable from 'models/RollTable';

export default authedSession({
    post: async (req, res) => {
        const { title } = req.body;
        await RollTable.create({ title });

        res.status(200).send();
    },
    get: async (req, res) => {
        res.status(200).send(
            await RollTable.find({})
                .populate('items', null, null, { sort: { title: -1 } })
                .lean()
        );
    },
});
