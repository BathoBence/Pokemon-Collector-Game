const mongoose= require('mongoose');
const {Schema, model} = mongoose;

const mapSchema = new Schema ({
    locations: [{
        name: String,
        subLocations: [],
        cleared: {
            type: Boolean,
            default: false
        }
    }],
    taken: {
        type: Boolean,
        default: false
    }
});

const Map = model('Map', mapSchema);

module.exports = Map;