module.exports = {
    index: {
        handler: (request, reply) => {
            const db = request.server.app.db;
            db.books.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });

        }
    }
}