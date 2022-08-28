import { authedSession } from 'lib/api/utils';
import Item from 'models/Item';

export default authedSession({
    delete: async (req, res) => {
        const { itemId } = req.query;

        await Item.deleteOne({ _id: itemId });

        res.status(200).send();
    },
});
