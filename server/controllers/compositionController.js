import Composition from '../models/composition';
import Boom from 'boom';
import User from '../models/user';
import {formatURLParamsToArray} from '../helpers/helpers.js'

export default {
    addComposition: {
        handler: (request, reply) => {
            try {
                let newComposition = new Composition();
                newComposition.newComposition(request.payload, request.auth.credentials._doc.username,
                    (err, composition) => {
                        try {
                            if (err) {
                                throw err;
                            }
                            reply("Created").code(200);

                        } catch (error) {
                            console.log(error);
                            reply("virhe").code(500);
                        }
                    });


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
                    .select('-__v').lean()
                    .populate('added_by', 'username -_id')
                    .exec((err, compositions) => {
                        if (err) {
                            throw err;
                        }

                        reply(compositions).code(200);
                    });
            } catch (err) {
                console.log(err);
                reply("Error").code(500);
            }
        },
        auth: false
    },
    searchCompositions: {
        handler: (request, reply) => {
            try {
                const searchValue =   request.query.searchValue
                const difficulty = formatURLParamsToArray(request.query.difficulty).map((val) => val.toLowerCase())
                const type = formatURLParamsToArray(request.query.type)
                const instrumentation = formatURLParamsToArray(request.query.instrumentation)
                const era = formatURLParamsToArray(request.query.era)

                const searchQuery =
                    {
                        $and:[
                            searchValue !== "" ? {
                                $or:[
                                    {name: {$regex: ".*" + searchValue + ".*", $options: 'i'}},
                                    {composer:{$regex: ".*" + searchValue + ".*", $options: 'i'}}
                                ],
                            } : {},
                            difficulty.length !== 0 ? {skill_level: {$in: difficulty}} : {},
                            //type !== [] ? {type: {$in: type}} : {},
                            instrumentation.length !== 0 ? {original_instruments: {$in: instrumentation}} : {},
                            era.length !== 0 ? {era_or_style: {$in: era}} : {}

                        ]
                    }

                Composition
                    .find(searchQuery)
                    .select('-__v')
                    .lean()
                    .populate('added_by', 'username -_id')
                    .exec((err, compositions) => {
                        if (err) {
                            throw err;
                        }

                        reply(compositions).code(200);
                    });
            }catch(error){
                console.log(error)
                reply("Error").code(500);
            }
        },
        auth: false
    },
    editComposition: {
        handler: (request, reply) => {
            try {
                Composition.findOne({ _id: request.payload._id })
                    .populate('added_by', 'username -_id')
                    .exec((err, doc) => {
                        if (err || doc === null || doc === {}) {
                            reply("No such document").code(200);
                            return;
                        }
                        console.log(doc);
                        if (request.auth.credentials._doc.username !== doc.added_by.username) {

                            reply("Cant do that").code(401);
                            return;
                        }
                        console.log(request.server.auth);
                        Composition.findOneAndUpdate({ _id: request.payload._id }, { $set: request.payload }, { new: true }, (err, doc) => {
                            if (err) {
                                reply("Edit failed").code(500);
                            }
                            reply("Edit success").code(200);
                        });
                    });


            } catch (err) {
                console.log(err);
                reply("Error").code(500);
            }
        },
        auth: 'jwt'
    }
};
