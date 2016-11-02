import mongoose from 'mongoose';

import config from '../../etc/config.json';

import '../models/Message';
import '../models/User';

const Message = mongoose.model('Message');
const User = mongoose.model('User');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listMessages() {
    return Message.find();
}

export function createMessage(data) {
    const message = new Message({
        messageId: data.messageId,
        name: data.name,
        userId: data.userId,
        text: data.text,
        createdAt: new Date()
    });

    return message.save();
}

export function deleteMessage(messageId) {
    return Message.findById(messageId).remove();
}

//------------------------------------

export function listUsers() {
    return User.find();
}

export function createUser(data) {
    const message = new Message({
        userId: data.userId,
        username: data.username,
        password: data.password
    });

    return message.save();
}
