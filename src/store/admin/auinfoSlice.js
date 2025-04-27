import { createSlice } from '@reduxjs/toolkit';

export const auinfoSlice = createSlice({
    name: 'info',
    initialState: {
        isLoadingInfo: false,
        infos: [],
        infoActive: {
            id: '',
            datos: '',
            link: '',
            fecha: '',
            state: false,
        }
    },
    reducers: {
        onLoadInfo: (state, { payload = [] }) => {
            state.infos = payload;
            // payload.forEach(usr => {
            //     const exists = state.infos.some(dbPro => dbPro.id === usr.id);
            //     if (!exists) {
            //         state.infos.push(usr);
            //     }
            // })
        },
        onAddNewInfo: (state, { payload = {} }) => {
            state.infos.push(payload);
        },
        onUpdateInfo: (state, { payload = {} }) => {
            state.infos = state.infos.map(cat => {
                if (cat.id === payload.id) {
                    return payload;
                }
                return cat;
            });
        },
        onViewInfo: (state, { payload }) => {
            state.infoActive = payload
        },
        onDeleteInfos: (state, { payload = 0 }) => {
            state.infos = state.infos.filter(cat => cat.id !== payload);
        },
        onIsLoagingInfo: (state, { payload }) => {
            state.isLoadingInfo = payload
        },
        onLogoutInfo: (state) => {
            state.isLoadingInfo = false;
            state.infos = [];
            state.infoActive = {
                id: '',
                datos: '',
                link: '',
                fecha: '',
                state: false,
            }
        },
    }
});

export const {
    onAddNewInfo,
    onDeleteInfos,
    onLoadInfo,
    onLogoutInfo,
    onIsLoagingInfo,
    onViewInfo,
    onUpdateInfo,
} = auinfoSlice.actions;