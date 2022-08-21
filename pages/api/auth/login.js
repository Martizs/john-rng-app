import { withSession } from 'lib/api/utils';
import { InvalidCredentials } from 'lib/consts/errorMessages';
import { comparePass } from 'lib/utils';
import User from 'models/User';

export default withSession({
    post: async (req, res) => {
        const { username, password } = req.body;

        const user = await User.findOne({
            username,
        }).select('_id password');

        if (!user) {
            throw Error(InvalidCredentials);
        }

        const correct = await comparePass(password, user.password);

        if (!correct) {
            throw Error(InvalidCredentials);
        }

        req.session.user = { _id: user._id };
        await req.session.save();
        res.status(200).send();
    },
});
