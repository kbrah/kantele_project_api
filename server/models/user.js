import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Using _id field as email field
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

// setting email field as _id field
UserSchema.virtual('email')
    .get(() => {
        return this._id;
    })
    .set(function(email) {
        this.set('_id', email)
    });
// before saving user, hashing and salting the password
UserSchema.pre('save', function(next) {
    let user = this;
    //only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
})

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema)