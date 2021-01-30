const mongoose = require('mongoose');
const schema = mongoose.schema;

const postSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    
    status: {
        type: String,
        default: 'public'
    },

    creationDate: {
        type: Date,
        default: Date.now()
    }
}
    
})

module.exports = mongoose.model('post', postSchema)