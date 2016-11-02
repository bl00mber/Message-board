import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId    : { type: String, required: true },
    username  : { type: String, required: true },
    password  : { type: String, required: true }
});

mongoose.model('User', UserSchema);
