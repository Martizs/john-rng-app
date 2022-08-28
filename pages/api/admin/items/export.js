import csvWriter from 'csv-write-stream';
import { authedSession } from 'lib/api/utils';
import Item from 'models/Item';

export default authedSession({
    get: async (req, res) => {
        const { search } = req.query;

        const searchObject = {};

        if (search) {
            searchObject.title = { $regex: search, $options: 'i' };
        }

        res.writeHead(200, {
            'Content-Type': 'text/csv',
        });

        var writer = csvWriter({
            headers: ['title', 'description', 'adminDescription'],
        });
        writer.pipe(res);

        const batchSize = 10000;
        let batchCount = 0;

        let items = await Item.find(searchObject)
            .skip(batchCount * batchSize)
            .limit(batchSize)
            .select('title description adminDescription')
            .lean();

        while (items.length > 0) {
            items.forEach((item) => {
                writer.write([
                    item.title,
                    item.description,
                    item.adminDescription,
                ]);
            });

            batchCount++;

            items = await Item.find(searchObject)
                .skip(batchCount * batchSize)
                .limit(batchSize)
                .select('title description adminDescription')
                .lean();
        }

        writer.end();
    },
});
