import { createSlice } from '@reduxjs/toolkit';

export const usalertSclice = createSlice({
    name: 'alert',
    initialState: {
        isLoadingAlert: false,
        alerts: [],
        tempid:'',
        alertActive: {
            id: "",
            fehca: '',
            estado: '',
            longitud: '',
            latitud: '',
            est: false
        },
        total: 0,
    },
    reducers: {
        onClearAlert: (state) => {
            state.alerts = [];
        },
        onLoadAlerts: (state, { payload = [] }) => {
            payload.forEach(usr => {
                const exists = state.alerts.some(dbPro => dbPro.id === usr.id);
                if (!exists) {
                    state.alerts.push(usr);
                }
            });
            state.total = state.alerts.length;
        },
        onLoadAlertsScokets: (state, { payload }) => {
            state.alerts = payload;
        },
        onAddNewAlert: (state, { payload = {} }) => {
            const exists = state.alerts.some(dbPro => dbPro.id === payload.id);
            if (!exists) {
                state.alertActive = payload;
                state.alerts.push(payload);
                state.total = state.alerts.length;
            }
        },
        onTemId: (state, { payload }) => {
            console.log(payload);
            if (state.tempId != payload) {
                state.tempId = payload;
            }
        },
        onViewAlert: (state, { payload }) => {
            state.alertActive = payload
        },
        onIsLoagingAlert: (state, { payload }) => {
            state.isLoadingAlert = payload
        },
        onUpdateAlert: (state, { payload = {} }) => {
            console.log(payload)
            state.alerts = state.alerts.map(cat => {
                if (cat.id === payload.id) {
                    return { ...cat, estado: payload.estado };
                }
                return cat;
            });
        },
        onDeleteAlert: (state, { payload = 0 }) => {
            state.alerts = state.alerts.filter(cat => cat.id !== payload);
            state.total = state.alerts.length;
        },
        onLogoutAlert: (state) => {
            state.isLoadingAlert = false;
            state.alerts = [
                // tempEvent
            ];
            state.alertActive = {
                id:'',
                fehca: '',
                estado: '',
                longitud: '',
                latitud: '',
                est: false
            };
            state.tempId = 0;
            state.total = 0;
        },
        onSetTotal: (state, { payload }) => {
            state.total = payload;
        }
    }
});

export const {
    onAddNewAlert,
    onViewAlert,
    onIsLoagingAlert,
    onLogoutAlert,
    onLoadAlerts,
    onSetTotal,
    onTemId,
    onLoadAlertsScokets,
    onUpdateAlert,
    onDeleteAlert,
    onClearAlert
} = usalertSclice.actions;