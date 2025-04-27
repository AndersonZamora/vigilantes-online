import { createSlice } from '@reduxjs/toolkit';

export const auserenesSlice = createSlice({
    name: 'serenes',
    initialState: {
        isLoadingSerenes: false,
        serenes: [],
        sereneActive: {
            id:'',
            apellidos: '',
            celular: '',
            correo: '',
            nombres: '',
            state: false,
        }
    },
    reducers: {
        onLoadSerenes: (state, { payload = [] }) => {
            payload.forEach(usr => {
                const exists = state.serenes.some(dbPro => dbPro.id === usr.id);
                if (!exists) {
                    state.serenes.push(usr);
                }
            })
        },
        onAddNewSerene: (state, { payload = {} }) => {
            state.serenes.push(payload);
        },
        onViewSerene: (state, { payload }) => {
            state.sereneActive = payload
        },
        onDeleteSerenes: (state, { payload = 0 }) => {
            state.serenes = state.serenes.filter(cat => cat.id !== payload);
        },
        onIsLoagingSerene: (state, { payload }) => {
            state.isLoadingSerenes = payload
        },
        onLogoutSerene: (state) => {
            state.isLoadingSerenes = false;
            state.serenes = [];
            state.sereneActive = {
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
    onAddNewSerene,
    onDeleteSerenes,
    onLoadSerenes,
    onLogoutSerene,
    onIsLoagingSerene,
    onViewSerene,
} = auserenesSlice.actions;