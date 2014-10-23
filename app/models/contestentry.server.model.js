'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contestentry Schema
 */
var ContestentrySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
    lineup: {
        type: Schema.ObjectId,
        ref: 'Lineup',
        required: 'You can\'t enter a contest without a lineup'
    },
    contest: {
        type: Schema.ObjectId,
        ref: 'Contest',
        required: 'You have to enter a contest to have a contest entry'
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Contestentry', ContestentrySchema);
