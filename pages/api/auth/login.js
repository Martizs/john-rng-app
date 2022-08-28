import { withSession } from 'lib/api/utils';
import { InvalidCredentials } from 'lib/consts/errorMessages';
import User from 'models/User';

export default withSession({
    post: async (req, res) => {
        const { username, password } = req.body;

        const user = await User.findOne({
            username,
        }).select('_id password');

        if (!user || !(await user.comparePassword(password))) {
            throw Error(InvalidCredentials);
        }

        req.session.user = { _id: user._id };
        await req.session.save();
        res.status(200).send();
    },
});
