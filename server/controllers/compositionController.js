import Composition from '../models/composition';
import Boom from 'boom';
import User from '../models/user';

export default {
    insertComposition: {
        handler: (request, reply) => {
            try {
                let newComposition = new Composition();
                newComposition.newComposition(request.payload, request.auth.credentials._doc.username,
                    (err, composition) => {
                        try {
                            if (err) {
                                throw err;
                                return;
                            }
                            reply("Created").code(200);

                        } catch (err) {
                            reply("virhe").code(500)
                        }
                    })


            } catch (err) {
                reply("Error").code(500);
            }
        },
        auth: 'jwt'
    },
    getAllCompositions: {
        handler: (request, reply) => {
            try {
                Composition.find({})
                    .select('-_id -__v').lean()
                    .populate('added_by', 'username -_id')
                    .exec((err, compositions) => {
                        if (err) {
                            throw err
                        }

                        reply(compositions).code(200)
                    })
            } catch (err) {
                console.log(err)
                reply("Error").code(500)
            }
        },
        auth: false
    }
}