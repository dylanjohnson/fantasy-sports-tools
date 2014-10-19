'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Position Schema
 */
var PositionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Position name',
		trim: true
	},
    abbreviation: {
        type: String,
        default: '',
        required: 'Please add an abbreviation'
    },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    isPseudo: {
        type: Boolean,
        default: false
    },
    includes: [{
        type: Schema.ObjectId,
        ref: 'Position'
    }]
});

mongoose.model('Position', PositionSchema);
