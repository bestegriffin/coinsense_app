var mongoose = require('mongoose');
var PortfolioSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    btn: {
        type: Number,
    },
    eth: {
        type: Number,
    },
    lit: {
        type: Number,
    },


});
// authenticate input against database documents
PortfolioSchema.statics.authenticate = function(id, callback) {
        Portfolio.findOne({ id: id })
            .exec(function(error, Portfolio) {
                if (error) {
                    return callback(error);
                } else if (!Portfolio) {
                    var err = new Error('User not found.');
                    err.status = 401;
                    return callback(err);
                }

            });
    }
    // hash password before saving to database
PortfolioSchema.pre('save', function(next) {
    var Portfolio = this;
    next();

});
var Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;