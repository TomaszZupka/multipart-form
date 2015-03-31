var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
        first_name: String,
        last_name: String,
        date_of_birth: Date,
        martial_status: {type: String, enum: ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOW']},
        email: String
    }),

    PropertySchema = new Schema({
        user_id: Schema.Types.ObjectId,
        property_type: {type: String, enum: ['HOUSE', 'FLAT']},
        built_year: Number,
        bedrooms_num: Number,
        bathrooms_num: Number,
        ownership_type: {type: String, enum: ['OWN', 'RENT']},
        adults_num: Number,
        children_num: Number,
        smokers: Boolean,
        long_term_unoccupied: Boolean,
        short_term_unoccupied: Boolean
    });

var User = mongoose.model('User', UserSchema),
    Property = mongoose.model('Property', PropertySchema);

exports.User = User;
exports.Property = Property;