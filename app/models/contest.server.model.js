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
    registrationStart: {
        type: Date,
        required: 'Add a registration start date'
    },
    registrationEnd: {
        type: Date,
        required: 'Add a registration end date'
    },
    playStart: {
        type: Date,
        required: 'Add a play start'
    },
    playEnd: {
        type: Date,
        required: 'Add a play end'
    },
    nflWeek: {
        type: Number
    },
    cost: {
        type: Number
    },
    entries: [{
        type: Schema.ObjectId,
        ref: 'ContestEntries'
    }],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Contest', ContestSchema);
