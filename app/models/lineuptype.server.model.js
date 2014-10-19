'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Lineuptype Schema
 */
var LineuptypeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Lineuptype name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Lineuptype', LineuptypeSchema);