import { authedSession } from 'lib/api/utils';
import RollTable from 'models/RollTable';

export default authedSession({
    post: async (req, res) => {
        const { tableId, itemId } = req.body;

        await RollTable.updateOne(
            { _id: tableId },
            { $push: { items: itemId } }
        );
        res.status(200).send();
    },
});
