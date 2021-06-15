import { FC } from 'react';
import { CircleLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import './loading.css';
import { ServiceAction } from '../../../store/service/ServiceAction';

export const LoadingIndicator: FC = () => {
    let isLoading = useSelector((state) => selectRequesting(state, [ServiceAction.GET_FILTERED_SERVICES, ServiceAction.DELETE_SERVICE]));

    return isLoading ? (
        <div className="container-loadingmodal modal-content">
            <CircleLoader color={'#36D7B7'} size={120} />
        </div>
    ) : (
        <div></div>
    );
};
