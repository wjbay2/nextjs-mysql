import { db, errorHandler } from 'helpers/api';

function apiHandler(handler) {
    return async (req, res) => {
        const method = req.method.toLowerCase();

        // check handler supports HTTP method
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            if (!db.initialized)
                await db.initialize();

            await handler[method](req, res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}

export { apiHandler };