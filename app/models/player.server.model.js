'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

require('./position.server.model.js');

/**
 * Player Schema
 */
var PlayerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Player name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
    position: {
        type: Schema.ObjectId,
        ref: 'Position'
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Player', PlayerSchema);
