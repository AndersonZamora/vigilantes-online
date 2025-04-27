import { createSlice } from '@reduxjs/toolkit';

export const auplacesSlice = createSlice({
    name: 'places',
    initialState: {
        isLoadingPlaces: false,
        places: [],
        placeActive: {
            id:'',
            detalle: '',
            direccion: '',
            barrio: '',
            longitud: '',
            latitud: '',
            nivel: '',
            state: false,
        }
    },
    reducers: {
        onLoadPlaces: (state, { payload = [] }) => {
            payload.forEach(usr => {
                const exists = state.places.some(dbPro => dbPro.id === usr.id);
                if (!exists) {
                    state.places.push(usr);
                }
            })
        },
        onAddNewPlace: (state, { payload = {} }) => {
            state.places.push(payload);
        },
        onUpdatePlace: (state, { payload = {} }) => {
            state.places = state.places.map(cat => {
                if (cat.id === payload.id) {
                    return payload;
                }
                return cat;
            });
        },
        onViewPlace: (state, { payload }) => {
            console.log(payload)
            state.placeActive = payload
        },
        onDeletePlaces: (state, { payload = 0 }) => {
            state.places = state.places.filter(cat => cat.id !== payload);
        },
        onIsLoagingPlace: (state, { payload }) => {
            state.isLoadingPlaces = payload
        },
        onLogoutPlace: (state) => {
            state.isLoadingPlaces = false;
            state.places = [];
            state.placeActive = {
                id:'',
                detalle: '',
                direccion: '',
                barrio: '',
                longitud: '',
                latitud: '',
                nivel: '',
                state: false,
            }
        },
    }
});

export const {
    onAddNewPlace,
    onDeletePlaces,
    onLoadPlaces,
    onLogoutPlace,
    onIsLoagingPlace,
    onViewPlace,
    onUpdatePlace,
} = auplacesSlice.actions;