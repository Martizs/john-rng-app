import { withIronSessionApiRoute } from 'iron-session/next';
import { Unauthorized } from 'lib/consts/errorMessages';
import dbConnect from '../dbConnect';
import { errorHandler } from './errorHandler';

export const apiHandler = (handler, checkAuth = false) => {
    return async (req, res) => {
        const method = req.method.toLowerCase();

        if (!handler[method]) {
            res.status(405).end(`Method ${req.method} Not Allowed`);
        } else {
            try {
                await dbConnect();

                if (checkAuth && (!req.session.user || !req.session.user._id)) {
                    throw Error(Unauthorized);
                }

                await handler[method](req, res);
            } catch (err) {
                errorHandler(err, res);
            }
        }
    };
};

export const withSession = (handler) =>
    withIronSessionApiRoute(apiHandler(handler), {
        cookieName: process.env.SESSION_COOKIE,
        password: process.env.SESSION_PASSWORD,
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
    });

export const authedSession = (handler) =>
    withIronSessionApiRoute(apiHandler(handler, true), {
        cookieName: process.env.SESSION_COOKIE,
        password: process.env.SESSION_PASSWORD,
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
    });
