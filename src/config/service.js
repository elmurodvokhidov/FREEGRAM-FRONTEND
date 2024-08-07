import api from "./api";

const service = {
    // auth
    async authRegister(auth) {
        const res = api.post('/auth/register', auth);
        return res;
    },
    async resetRegistration(phoneNumber) {
        const res = api.post('/auth/reset', { phoneNumber: `998${phoneNumber}` });
        return res;
    },
    async authLogin(auth) {
        const res = api.post('/auth/login', auth);
        return res;
    },
    async verifyAuth(code, phoneNumber) {
        const res = api.post(`/auth/verify/${code}`, { phoneNumber: `998${phoneNumber}` });
        return res;
    },
    async authLogout() {
        const res = api.post('/auth/logout');
        return res;
    },
    async getCurrentAuth() {
        const res = api.get('/auth/me');
        return res;
    },

    // users
    async getAllUsers() {
        const res = api.get('/users');
        return res;
    },

    // messages
    async getMessages(id) {
        const res = api.get(`/messages/${id}`);
        return res;
    },
    async sendMessage(message, receiver) {
        const res = api.post(`/messages/${receiver}`, { message });
        return res;
    },
};

export default service;