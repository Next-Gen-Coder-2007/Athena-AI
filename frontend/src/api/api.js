import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function setAuthToken(token) {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
}

async function login(formData) {
    return API.post('/auth/login', formData);
}

async function register(formData) {
    return API.post('/auth/register', formData);
}

const Admin = {
    createStudent: (data) => API.post('/admin/students', data),
    updateStudent: (id, data) => API.put(`/admin/students/${id}`, data),
    deleteStudent: (id) => API.delete(`/admin/students/${id}`),
    listStudents: () => API.get('/admin/students'),

    createRecruiter: (data) => API.post('/admin/recruiters', data),
    updateRecruiter: (id, data) => API.put(`/admin/recruiters/${id}`, data),
    deleteRecruiter: (id) => API.delete(`/admin/recruiters/${id}`),
    listRecruiters: () => API.get('/admin/recruiters'),
    linkRecruiter: (data) => API.post('/admin/recruiters/link', data),
    suggestUsername: (username) => API.get(`/admin/username-suggest?username=${encodeURIComponent(username)}`),

    createCompany: (data) => API.post('/admin/companies', data),
    updateCompany: (id, data) => API.put(`/admin/companies/${id}`, data),
    deleteCompany: (id) => API.delete(`/admin/companies/${id}`),
    listCompanies: () => API.get('/admin/companies'),
};

export { API as default, setAuthToken, login, register, Admin };