import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    messageId : { type: String },
    name      : { type: String },
    userId    : { type: String },
    text      : { type: String, required: true },
    createdAt : { type: Date }
});

mongoose.model('Message', MessageSchema);
