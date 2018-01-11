var mongoose = require('mongoose');
var ProfileSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    city: {
        type: String,
    },
    website: {
        type: String,
    }
});
// authenticate input against database documents
ProfileSchema.statics.authenticate = function(id, callback) {
        Profile.findOne({ id: id })
            .exec(function(error, Profile) {
                if (error) {
                    return callback(error);
                } else if (!Profile) {
                    var err = new Error('User not found.');
                    err.status = 401;
                    return callback(err);
                }

            });
    }
    // hash password before saving to database
ProfileSchema.pre('save', function(next) {
    var Profile = this;
    next();

});
var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;