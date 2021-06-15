import { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { FormUpdateService } from './FormUpdateService';
import { ServiceAction } from '../../../store/service/ServiceAction';

export type Site = {
    name: string;
    description: string;
    region: string;
    changes: [];
};

interface IModalEditService {
    existingService: any;
}

export const ModalEditForm: FC<IModalEditService> = ({ existingService }) => {
    const [visibility, setVisibility] = useState<boolean>(false);
    const isFinished = useSelector((state) => selectFinished(state, [ServiceAction.UPDATE_SERVICE]));

    useEffect(() => {
        if (isFinished) setVisibility(false);
    }, [isFinished]);

    const showModal = () => {
        setVisibility(true);
    };

    return (
        <>
            <Button onClick={() => showModal()}>Edit</Button>
            <Modal
                title={'Update Service'}
                visible={visibility}
                closable={true}
                maskClosable={true}
                footer={null}
                onCancel={() => setVisibility(false)}
            >
                <FormUpdateService existingService={existingService} />
            </Modal>
        </>
    );
};
