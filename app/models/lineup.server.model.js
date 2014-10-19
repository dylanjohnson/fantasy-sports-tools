'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Lineup Schema
 */
var LineupSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Lineup name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
    players: [{
        type: Schema.ObjectId,
        ref: 'Player'
    }],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Lineup', LineupSchema);
