import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { citizenApi } from '../../api';
import { errorAlert, progressBar, successAlert } from '../../helpers';
import { onAddNewSerene, onDeleteSerenes, onIsLoagingSerene, onLoadSerenes, onViewSerene } from '../../store';

export const useAdSerene = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { serenes, isLoadingSerenes, sereneActive } = useSelector(state => state.auserenes);

    const startLoadingSerene = async () => {
        try {
            dispatch(onIsLoagingSerene(true));
            const { data } = await citizenApi.get('/kanrisha/risuto/serene');
            dispatch(onLoadSerenes(data.list))
            setTimeout(() => {
                dispatch(onIsLoagingSerene(false));
            }, 10);
        } catch (error) {
            dispatch(onIsLoagingSerene(false));
        }
    }

    const starNewSerene = async (model) => {
        try {
            progressBar('Registrando...');
            await citizenApi.post('/kanrisha/risuto/serene', model);
            //dispatch(onAddNewSerene({ ...model, id: data.uid }));
            successAlert('Resgistrado');
            Swal.close();
            navigate('/serene');
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                if (data.erros) {
                    const { cel, email, msg } = data.erros;
                    errorAlert(
                        `Error al registra: ${(email != '') ? email : ''} 
                        ${(cel != '') ? cel : ''}
                        ${(msg != '') ? msg : ''}`
                    );
                } else {
                    Swal.close();
                    errorAlert('Error al registrar');
                }
            } else {
                Swal.close();
                errorAlert('Error al registrar');
            }
        }
    }

    const startActiveSerene = (model) => {
        dispatch(onViewSerene({ ...model, state: true }));
    }

    const startDeleteSerene = async (id = sereneActive.id) => {
        try {
            progressBar('Eliminando...');
            await citizenApi.delete(`/kanrisha/risuto/serene/${id}`);
            dispatch(onDeleteSerenes(id));
            Swal.close();
            successAlert('Usuario eliminado');
            navigate('/serene');
        } catch (error) {
            Swal.close();
            errorAlert('Error al eliminar');
        }
    }

    const startCancel = (id) => {
        navigate('/serene');
    }

    return {
        serenes,
        sereneActive,
        isLoadingSerenes,
        starNewSerene,
        startLoadingSerene,
        startActiveSerene,
        startCancel,
        startDeleteSerene,
    }
}
