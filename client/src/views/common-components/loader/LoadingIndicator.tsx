import { FC } from 'react';
import { CircleLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import './loading.css';
import { ServiceAction } from '../../../store/service/ServiceAction';
import { OrderAction } from '../../../store/order/OrderAction';

export const LoadingIndicator: FC = () => {
    let isLoading = useSelector((state) => selectRequesting(state, [ServiceAction.GET_FILTERED_SERVICES, OrderAction.CHANGE_ORDER_STATUS]));

    return isLoading ? (
        <div className="container-loadingmodal modal-content">
            <CircleLoader color={'#36D7B7'} size={120} />
        </div>
    ) : (
        <div></div>
    );
};
