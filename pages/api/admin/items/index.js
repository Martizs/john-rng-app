import { authedSession } from 'lib/api/utils';
import Item from 'models/Item';

export default authedSession({
    get: async (req, res) => {
        const { search, page = 0, pageSize = 15 } = req.query;

        const searchObject = {};

        if (search) {
            searchObject.title = { $regex: search, $options: 'i' };
        }

        res.send(await Item.find(searchObject).limit(pageSize).skip(page));
    },
    post: async (req, res) => {
        const { title, description, adminDescription } = req.body;

        await Item.create({ title, description, adminDescription });

        res.status(200).send();
    },
    put: async (req, res) => {
        const { _id, title, description, adminDescription } = req.body;

        await Item.updateOne({ _id }, { title, description, adminDescription });

        res.status(200).send();
    },
});
