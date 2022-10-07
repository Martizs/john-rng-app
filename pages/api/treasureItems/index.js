import { apiHandler } from 'lib/api/utils';
import TreasureItem from 'models/TreasureItem';

export default apiHandler({
    get: async (req, res) => {
        res.status(200).send(await TreasureItem.find({}).lean());
    },
});
