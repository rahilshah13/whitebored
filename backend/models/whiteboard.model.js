const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        username: { type: String, unique: true},
        public: {type: Boolean, default: false},
        timestamp: {type: Date, default: Date.now},
        strokes: []
        //implement later
        // friends: [{type: Schema.Types.ObjectId, ref:'User'}]
    }
);

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Whiteboard', schema);
