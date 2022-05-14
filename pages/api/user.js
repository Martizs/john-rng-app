// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from 'lib/dbConnect';
import { getHashedPass } from 'lib/utils';
import User from 'models/User';

export default async (req, res) => {
    const { method } = req;

    console.log('db connection started');
    await dbConnect();
    console.log('db connection done succesffully');

    switch (method) {
        case 'GET':
            try {
                res.json(await User.find({}));
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
            break;
        // case 'POST':
        //     try {
        //         const { username, password } = req.body;

        //         res.json(
        //             await User.create({
        //                 username,
        //                 password: await getHashedPass(password),
        //             })
        //         );
        //     } catch (error) {
        //         res.status(400).json({ message: error.message });
        //     }
        //     break;
        default:
            res.status(400).json({ message: 'Bruh, no such route' });
            break;
    }
};
