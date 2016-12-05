import axios from 'axios';

import { apiPrefix } from '../../config/config.json';

export default {
    // Messages
    loadMessages() {
        return axios.get(`${apiPrefix}/messages`);
    },

    createMessage(data) {
        return axios.post(`${apiPrefix}/messages`, data);
    },

    deleteMessage(messageId) {
        return axios.delete(`${apiPrefix}/messages/${messageId}`);
    },

    // Users
    logIn(data) {
        return axios.post(`${apiPrefix}/login`, data);
    },

    createUser(data) {
        return axios.post(`${apiPrefix}/create-user`, data);
    },

    restoreSession() {
        return axios.get(`${apiPrefix}/restore-session`);
    },

    logOut() {
        return axios.get(`${apiPrefix}/logout`);
    }
}
