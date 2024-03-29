import { authedSession } from 'lib/api/utils';
import Item from 'models/Item';

export default authedSession({
    get: async (req, res) => {
        const { search, page, pageSize } = req.query;

        const searchObject = {};

        if (search) {
            searchObject.title = { $regex: search, $options: 'i' };
        }

        let itemQuery = Item.find(searchObject).sort({
            createdAt: -1,
            _id: 1,
        });

        let total = 0;
        if (page !== undefined && pageSize !== undefined) {
            total = await Item.find(searchObject).countDocuments();
            itemQuery = itemQuery
                .limit(parseInt(pageSize))
                .skip(parseInt(page) * parseInt(pageSize));
        }

        const data = await itemQuery
            .select('_id title description adminDescription')
            .lean();

        res.send({
            data,
            total,
        });
    },
    post: async (req, res) => {
        const { title, description, adminDescription } = req.body;

        const item = await Item.create({
            title,
            description,
            adminDescription,
        });

        res.status(200).send(item);
    },
    put: async (req, res) => {
        const { _id, title, description, adminDescription } = req.body;

        const item = await Item.findById(_id);
        item.title = title;
        item.description = description;
        item.adminDescription = adminDescription;
        await item.save();

        res.status(200).send(item);
    },
});
