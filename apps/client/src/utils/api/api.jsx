import axios from 'axios';
import {toast} from "react-toastify";

export const apiUrl = '/api';

const createUser = async (userData) => {
    return await toast.promise(
        axios({
            method: 'post',
            url: `${apiUrl}/users/create`,
            data: userData
        })
            .then(res => {
                return res.data;
            }),
        {
            pending: 'Створення користувача!',
            success: 'Користувача створено!',
            error: 'Пошта, яку ви ввели, вже зареєстрована!'
        },
    );
};

const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${apiUrl}/users/${userId}`);
        console.log('Користувач видалений:', response.data);
        return response.data;
    } catch (error) {
        console.error('Помилка при видаленні користувача:', error.response.data.message);
        throw error;
    }
};
const activateUser = async (userId, isActive) => {
    try {
        const response = await axios.put(`${apiUrl}/users/${userId}/activate-deactivate`, { isActive: isActive });
        return response.data;
    } catch (error) {
        console.error('помилка:', error.response.data.message);
        throw error;
    }
};

const loginUser = async (credentials) => {
    return await toast.promise(
        axios({
            method: 'post',
            url: `${apiUrl}/users/login`,
            data: credentials
        })
            .then(res => {
                if (res.data.status === 'success') {
                    document.cookie = `Authorization=Bearer ${res.data.data.token}; path=/; Secure;`;

                    return res.data;
                }
            }),
        {
            pending: 'Авторизація',
            success: 'Успішний вхід! 👌',
            error: 'Невірна пошта/пароль!'
        },
    );
};

const editUser = async (data, userId, user) => {
    return await toast.promise(
        axios({
            method: 'put',
            url: `${apiUrl}/users/edit/${userId}`,
            data: data
        })
            .then(res => {
                return res.data.status;
            }),
        {
            success: `Пароль користувача "${user}" було змінено!`,
        },
    );
};

const getUsers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/users/get`);
        return response.data;
    } catch (error) {
        console.error('Помилка при отриманні списку користувачів:', error.response.data.message);
        throw error;
    }
};

const getCurrentUser = async (userId) => {
    try {
        const response = await axios.get(`${apiUrl}/users/user-id/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Помилка при отриманні інформації про поточного користувача:', error.response.data.message);
        throw error;
    }
};
const createTelephony = async (createTelephonyDto) => {
    return await toast.promise(
        axios({
            method: 'post',
            url: `${apiUrl}/users/telephony`,
            data: createTelephonyDto
        })
            .then(res => {
                if (res.data.status === 'success') {
                    return res.data;
                }
            }),
        {
            pending: 'Створення телефонії!',
            success: 'Телефонію створено!',
            error: 'Помилка при створенні телефонії!'
        },
    );
};

const removeTelephony = async (id) => {
    await toast.promise(
        axios({
            method: 'DELETE',
            url: `${apiUrl}/users/telephony-deleted/${id}`
        }),
        {
            pending: 'Видалення телефонії...',
            success: 'Телефонію видалено!',
            error: 'Помилка при видаленні телефонії!'
        },
    );
}

const editingTelephony = async (id, data) => {
    await toast.promise(
        axios({
            method: 'PUT',
            url: `${apiUrl}/users/telephony-update/${id}`,
            data: data
        }),
        {
            pending: 'Редагування телефонії...',
            success: 'Телефонію змімено!',
            error: 'Помилка при редагуванні телефонії!'
        },
    );
}

const addTelephonyToUser = async (userId, telephonyId) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${apiUrl}/users/${userId}/select-telephony/${telephonyId}`
        })

        if (res.data.status === 'success') {
            toast.success('Телефонію додано!');

            return res.data.data;
        }

    } catch (error) {
        toast.error(`Помилка при виборі телефонії: ${error.response?.data?.message}`);
    }
};


export {
    createUser,
    editUser,
    loginUser,
    getCurrentUser,
    getUsers,
    deleteUser,
    createTelephony,
    activateUser,
    removeTelephony,
    addTelephonyToUser,
    editingTelephony
};