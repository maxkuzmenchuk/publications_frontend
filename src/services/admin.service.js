import axios from "axios";
import authHeader from "@/services/auth-header";
import BASE_ADMIN_URL from '@/util/const'

class AdminService {
    getAllUsers() {
        var list = undefined;
        axios.get(BASE_ADMIN_URL + 'show-all',{
            headers: authHeader()
        })
            .then(r => {
                this.list = r.data;
            });

        return list;
    }

    getUserById(id) {
        var user = undefined;
        axios.get(BASE_ADMIN_URL + 'show-user/' + id, {
            headers: authHeader()
        })
            .then(resp => {
                this.user = resp.data;
            });

        return user;
    }
}

export default AdminService();