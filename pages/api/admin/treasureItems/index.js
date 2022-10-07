import { authedSession } from 'lib/api/utils';
import TreasureItem from 'models/TreasureItem';

export default authedSession({
    post: async (req, res) => {
        const { treasureItems } = req.body;
        await TreasureItem.deleteMany({});

        await TreasureItem.insertMany(
            treasureItems.map((treasureItem) => ({
                title: treasureItem.title,
                description: treasureItem.description,
            }))
        );

        res.status(200).send();
    },
    delete: async (req, res) => {
        await TreasureItem.deleteMany({});

        res.status(200).send();
    },
});
