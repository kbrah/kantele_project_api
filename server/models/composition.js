import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import User from './user';

// TODO: make needed fields unique

const CompositionSchema = new Schema({
    difficulty: {
        type: String,
        enum: [
            "beginner",
            "basic1",
            "basic2",
            "basic3",
            "d",
            "c",
            "b",
            "a"
        ],
        lowercase: true
    },
    era: {
        type: String,
        enum: [
            "middle_ages",
            "baroque",
            "galant_classicism",
            "romanticism_piano",
            "romanticism_harp",
            "finnish_national_romanticism",
            "impressionism",
            "minimalism",
            "contemporary",
            "sonatas",
            "concertos",
            "others"
        ],
        lowercase: true
    },
    composer: { type: String, required: true },
    arranger: String,
    name: String,
    year: String,
    instrumentation: [],
    availability_info: String,
    extra_info: String,
    recording: [],
    duration: { type: String, match: [/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, "wrong time format"] },
    concertos: String, // ???
    added_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

// Method for creating new Composition to the database
CompositionSchema.methods.newComposition = function newComposition(data, added_by, callback) {
    console.log(data)
    User.findOne({ username: added_by }, (err, user) => {
        if (err) {
            throw "Error in finding the user"
        } else if (!user) {
            throw "User not found"
        }

        let Composition = mongoose.model('Composition', CompositionSchema)

        Composition.create({
            difficulty: data.difficulty,
            era: data.era ? data.era : undefined,
            composer: data.composer,
            arranger: data.arranger,
            name: data.name,
            year: data.year,
            instrumentation: data.instrumentation,
            availability_info: data.availability_info,
            extra_info: data.extra_info,
            recording: data.recording,
            duration: data.duration,
            concertos: data.concertos,
            added_by: user
        },
            callback
        )

    })
    return;
}

export default mongoose.model('Composition', CompositionSchema)
