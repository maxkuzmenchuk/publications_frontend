import axios from "axios";
// import BASE_URL from '@/util/const';

const BASE_URL = 'http://localhost:9090/';

class AuthService {
    login(user) {
        return axios
            .post(BASE_URL + 'authenticate', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }

                return response.data;
            });
    }


    logout() {
        localStorage.removeItem('token');
    }

    register(user) {
        return axios.post(BASE_URL + 'registration', {
            username: user.username,
            password: user.password
        });
    }
}

export default new AuthService();
