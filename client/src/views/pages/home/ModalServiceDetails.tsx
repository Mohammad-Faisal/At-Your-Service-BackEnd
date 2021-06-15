import { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { ServiceProviderDetails } from './ServiceProviderDetails';
import { BounceLoader } from 'react-spinners';
import { useGetServiceProviderDetails } from './hooks/useGetServiceProviderDetails';

interface IModalServiceDetails {
    serviceId: number;
}
export const ModalServiceDetails: FC<IModalServiceDetails> = ({ serviceId }) => {
    const [visibility, setVisibility] = useState<boolean>(false);

    const { status, data, isLoading, error } = useGetServiceProviderDetails(serviceId);

    useEffect(() => {
        console.log('data is ', data);
    }, [data]);

    const details: any = data?.data?.data;

    const showModal = () => setVisibility(true);
    return (
        <>
            <Button onClick={() => showModal()}>{'Details '}</Button>
            <Modal title={'Service Provider Details'} visible={visibility} closable={true} footer={null} onCancel={() => setVisibility(false)}>
                {isLoading ? (
                    <div style={{ height: '150px', display: 'grid', justifyItems: 'center' }}>
                        {' '}
                        <BounceLoader color={'#36D7B7'} size={120} />{' '}
                    </div>
                ) : error ? (
                    <div> Details Not Found! </div>
                ) : (
                    <ServiceProviderDetails details={details} />
                )}
            </Modal>
        </>
    );
};
