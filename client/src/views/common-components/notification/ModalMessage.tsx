import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { selectModalNotification } from '../../../store/misc/common/CommonSelector';
import { INotification, NotificationType } from '../../../store/misc/common/general-models/NotificationType';

export const ModalMessage = () => {
    const modalNotification: INotification = useSelector(selectModalNotification);

    useEffect(() => {
        switch (modalNotification.type) {
            case NotificationType.SUCCESS:
                Modal.success({ title: modalNotification.message });
                break;
            case NotificationType.ERROR:
                Modal.error({ title: modalNotification.message });
                break;
            case NotificationType.WARNING:
                Modal.warning({ title: modalNotification.message });
                break;
        }
    }, [modalNotification]);

    return <div></div>;
};
