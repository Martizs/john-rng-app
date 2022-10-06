import { authedSession } from 'lib/api/utils';
import { DuplicateEntry } from 'lib/consts/errorMessages';
import RollTable from 'models/RollTable';

export default authedSession({
    post: async (req, res) => {
        const { tableId, itemId } = req.body;

        const rollTable = await RollTable.findById(tableId).populate('items');

        if (
            rollTable.items.find(
                (rollTableItem) => rollTableItem._id === itemId
            )
        ) {
            throw Error(DuplicateEntry);
        }

        rollTable.items.push(itemId);

        await rollTable.save();

        res.status(200).send();
    },
});
