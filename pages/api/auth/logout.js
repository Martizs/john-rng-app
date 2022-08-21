import { authedSession } from 'lib/api/utils';

export default authedSession({
    post: async (req, res) => {
        req.session.destroy();
        res.status(200).send();
    },
});
