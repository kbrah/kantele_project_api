import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const CompositionSchema = new Schema({
    skill_level: { type: String, enum: ["beginner", "basic1", "basic2", "basic3", "d", "c", "b", "a"] },
    era_or_style: {
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
        ]
    },
    composer: String,
    arranger: String,
    name: String,
    original_instruments: [],
    availability_info: String,
    extra_info: String,
    recording: [],
    duration: String,
    concertos: String,
})

export default mongoose.model('Composition', CompositionSchema)