import { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { FormGiveOrderReview } from './FormGiveOrderReview';
import { OrderAction } from '../../../store/order/OrderAction';
interface IModalReviewOrder {
    orderId: number;
}
export const ModalReviewOrder: FC<IModalReviewOrder> = ({ orderId }) => {
    const [visibility, setVisibility] = useState<boolean>(false);
    const isFinished = useSelector((state) => selectFinished(state, [OrderAction.GIVE_REVIEW]));

    useEffect(() => {
        if (isFinished) setVisibility(false);
    }, [isFinished]);
    const showModal = () => setVisibility(true);

    return (
        <>
            <Button onClick={() => showModal()}>{' Give Review '}</Button>
            <Modal visible={visibility} closable={true} footer={null} title={'Give Review'} onCancel={() => setVisibility(false)}>
                <FormGiveOrderReview orderId={orderId} />
            </Modal>
        </>
    );
};
