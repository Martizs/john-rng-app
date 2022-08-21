import { InvalidCredentials, Unauthorized } from 'lib/consts/errorMessages';

export const errorHandler = (err, res) => {
    res.status(500);

    if (err.message === InvalidCredentials) {
        res.status(400);
    }

    if (err.message === Unauthorized) {
        res.status(401);
    }

    res.send({ message: err.message });
};
