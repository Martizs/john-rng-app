import { authedSession } from 'lib/api/utils';
import Item from 'models/Item';
import formidable from 'formidable';
import fs from 'fs';
import { parse } from 'csv-parse';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default authedSession({
    post: async (req, res) => {
        const itemData = [];

        await new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();

            form.on('file', function (field, file) {
                let rowIndex = 0;

                fs.createReadStream(file.filepath)
                    .pipe(parse({ delimiter: ',' }))
                    .on('data', (row) => {
                        if (rowIndex) {
                            itemData.push({
                                title: row[0],
                                description: row[1],
                                adminDescription: row[2],
                            });
                        } else {
                            rowIndex++;
                        }
                    })
                    .on('end', () => {
                        resolve();
                    })
                    .on('error', (err) => {
                        reject(err);
                    });
            });

            form.on('error', (err) => {
                reject(err);
            });

            form.parse(req);
        });

        await Item.insertMany(itemData);

        res.status(200).send();
    },
});
