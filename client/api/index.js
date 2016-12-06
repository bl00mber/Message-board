import axios from 'axios';

export default {
    // Messages
    loadMessages() {
        return axios.get(`/messages`);
    },

    createMessage(data) {
        return axios.post(`/messages`, data);
    },

    deleteMessage(messageId) {
        return axios.delete(`/messages/${messageId}`);
    },

    // Users
    logIn(data) {
        return axios.post(`/login`, data);
    },

    createUser(data) {
        return axios.post(`/create-user`, data);
    },

    restoreSession() {
        return axios.get(`/restore-session`);
    },

    logOut() {
        return axios.get(`/logout`);
    }
}
