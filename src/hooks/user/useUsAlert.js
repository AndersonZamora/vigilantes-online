import Swal from 'sweetalert2';
import { citizenApi } from '../../api';
import { errorAlert, progressBar, successAlert } from '../../helpers';
import { onAddNewAlert, onLoadAlerts, onViewAlert } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export const useUsAlert = () => {

    const dispatch = useDispatch();

    const { alertActive, isLoadingAlert, alerts } = useSelector(state => state.usalert);

    const starNewAlert = async (model, socket) => {
        try {
            progressBar('Registrando...');
            const { data } = await citizenApi.post('/shimin/suru-tame', model);
            dispatch(onViewAlert({ id: data.uid, ...model, est: true, estado: 'enviado' }));
            successAlert('Resgistrado');
            socket.emit('denuncia', { id: data.uid });
            Swal.close();
        } catch (error) {
            Swal.close();
            errorAlert('Error al registrar');
        }
    }

    const starNewAlertSoket = (model) => {
        try {
            dispatch(onAddNewAlert({ ...model, est: true, estado: 'enviado' }));
            dispatch(onViewAlert({ ...model, est: true, estado: 'enviado' }));
            successAlert('Resgistrado');
            Swal.close();
        } catch (error) {
            Swal.close();
            errorAlert('Error al registrar');
        }
    }

    const starLoadAlertSend = async () => {
        try {
            progressBar('Cargando...');
            const { data } = await citizenApi.get('/shimin/risuto-suru');
            dispatch(onLoadAlerts(data.list))
            Swal.close();
        } catch (error) {
            Swal.close();
            errorAlert('Error al registrar');
        }
    }

    const startClear = () => {
        dispatch(onViewAlert({
            id: "",
            fehca: '',
            estado: '',
            longitud: '',
            latitud: '',
            est: false
        }));
    }

    return {
        isLoadingAlert,
        ...alertActive,
        alerts,
        starNewAlert,
        startClear,
        starLoadAlertSend,
        starNewAlertSoket,
    }
}