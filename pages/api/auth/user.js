import { authedSession } from 'lib/api/utils';
import User from 'models/User';

export default authedSession({
    get: async (req, res) => {
        res.send(await User.findById(req.session.user._id));
    },
});
