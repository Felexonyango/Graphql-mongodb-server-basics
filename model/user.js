const { introspectionFromSchema } = require('graphql')
const { toInteger } = require('lodash')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectID } = require('mongodb')
ObjectID.prototype.valueOf = function() {
    return this.toString();
};

const userSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    age: Number,

})
module.exports = mongoose.model('User', userSchema)