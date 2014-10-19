'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contest Schema
 */
var ContestSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Contest name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
    cost: {
        type: Number
    },
    lineup: {
        type: Schema.ObjectId,
        ref: 'Lineup'
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Contest', ContestSchema);
