import { createSlice } from '@reduxjs/toolkit';

export const ausersSlice = createSlice({
    name: 'users',
    initialState: {
        isLoadingUsers: false,
        users: [],
        userActive: {
            id:'',
            apellidos: '',
            celular: '',
            correo: '',
            nombres: '',
            state: false,
        }
    },
    reducers: {
        onLoadUsers: (state, { payload = [] }) => {
            payload.forEach(usr => {
                const exists = state.users.some(dbPro => dbPro.id === usr.id);
                if (!exists) {
                    state.users.push(usr);
                }
            })
        },
        onViewUser: (state, { payload }) => {
            state.userActive = payload
        },
        onDeleteUsers: (state, { payload = 0 }) => {
            state.users = state.users.filter(cat => cat.id !== payload);
        },
        onIsLoagingUser: (state, { payload }) => {
            state.isLoadingUsers = payload
        },
        onLogoutUser: (state) => {
            state.isLoadingUsers = false;
            state.users = [];
            state.userActive = {
                id:'',
                apellidos: '',
                celular: '',
                correo: '',
                nombres: '',
                state: false,
            }
        },
    }
});

export const {
    onLoadUsers,
    onDeleteUsers,
    onLogoutUser,
    onIsLoagingUser,
    onViewUser,
} = ausersSlice.actions;