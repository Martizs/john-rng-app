import {
    InvalidCredentials,
    Unauthorized,
    DuplicateEntry,
} from 'lib/consts/errorMessages';

export const errorHandler = (err, res) => {
    res.status(500);

    let message = err.message;

    if (err.message === InvalidCredentials) {
        res.status(400);
    }

    if (err.message === Unauthorized) {
        res.status(401);
    }

    if (err.message.includes('duplicate key')) {
        res.status(400);
        message = DuplicateEntry;
    }

    if (err.message === DuplicateEntry) {
        res.status(400);
    }

    res.send({ message });
};
