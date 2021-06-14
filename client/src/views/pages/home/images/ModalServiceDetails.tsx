import { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectFinished } from '../../../../store/misc/finished/FinishedSelector';
import { ServiceAction } from '../../../../store/service/ServiceAction';
import { selectServiceDetails } from '../../../../store/service/ServiceSelector';
import { DeleteServiceRequest } from '../../../../store/service/requests/DeleteServiceRequest';
import { selectRequesting } from '../../../../store/misc/requesting/RequestingSelector';

interface IModalServiceDetails {
    serviceId: number;
}
export const ModalServiceDetails: FC<IModalServiceDetails> = ({ serviceId }) => {
    const [visibility, setVisibility] = useState<boolean>(false);
    const isFinished = useSelector((state) => selectFinished(state, [ServiceAction.GET_DETAILS]));
    const isRequesting = useSelector((state) => selectRequesting(state, [ServiceAction.GET_DETAILS]));

    const details: any = useSelector(selectServiceDetails);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ServiceAction.getDetails(new DeleteServiceRequest(serviceId)));
    }, [serviceId]);

    useEffect(() => {
        if (isFinished) setVisibility(false);
    }, [isFinished]);
    const showModal = () => setVisibility(true);
    return (
        <>
            <Button onClick={() => showModal()}>{' View Details '}</Button>
            <Modal visible={visibility} closable={true} footer={null} title={'Details'} onCancel={() => setVisibility(false)}>
                <div>{details.serviceProviderName}</div>
                <div>{details.averageRating}</div>
                <div>
                    {details.reviews?.map((singleReview) => {
                        return (
                            <div>
                                <div> {singleReview.review}</div>
                                <div> {singleReview.rating}</div>
                            </div>
                        );
                    })}
                </div>
            </Modal>
        </>
    );
};
