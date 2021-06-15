import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderAction } from '../../../store/order/OrderAction';
import { PlaceOrderRequest } from '../../../store/order/requests/PlaceOrderRequest';
import styled from 'styled-components';
import CarRepair from './images/car-repair.jpg';
import Carpentry from './images/carpentry.jpg';
import Demolition from './images/demolition.jpg';
import HomeImprovement from './images/home-improvement.jpg';
import Landscaping from './images/landscaping.jpg';
import Moving from './images/moving.jpg';
import Cleaning from './images/cleaning.jpg';
import { ServiceType, UserType } from '../../../constants/GeneralConstants';
import { selectLoggedInUserType } from '../../../store/user/UserSelector';
import CommonAction from '../../../store/misc/common/CommonAction';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Rate } from 'antd';
import { ModalServiceDetails } from './ModalServiceDetails';
const { confirm } = Modal;

export const IndividualService = ({ service }: any) => {
    const dispatch = useDispatch();

    const userType = useSelector(selectLoggedInUserType);

    let serviceLogo = Landscaping;

    if (service.type === ServiceType.CAR_REPAIR) serviceLogo = CarRepair;
    if (service.type === ServiceType.CARPENTRY) serviceLogo = Carpentry;
    if (service.type === ServiceType.MOVING) serviceLogo = Moving;
    if (service.type === ServiceType.DEMOLITION) serviceLogo = Demolition;
    if (service.type === ServiceType.LANDSCAPING) serviceLogo = Landscaping;
    if (service.type === ServiceType.HOME_IMPROVEMENT) serviceLogo = HomeImprovement;
    if (service.type === ServiceType.CLEANING) serviceLogo = Cleaning;

    const orderService = () => {
        if (userType === UserType.UNAUTHENTICATED) dispatch(CommonAction.showWarningModal('Please log in first to order something!'));
        else {
            confirm({
                title: 'Do you want to request for this service?',
                icon: <ExclamationCircleOutlined />,
                content: 'After you order the service the service provider will confirm',
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => dispatch(OrderAction.placeOrder(new PlaceOrderRequest(service.id))),
            });
        }
    };

    return (
        <ServiceSummaryContainer>
            <img style={{ maxHeight: '250px', width: '100%' }} src={serviceLogo} />
            <ServiceTitle>{service.name} </ServiceTitle>

            <Rate value={service.averageRating} style={{ fontSize: '10px', marginLeft: '10px' }} />
            <ServiceDescription>{service.description} </ServiceDescription>
            <ServiceProviderName>
                <div> Offered By {service.provider?.name}</div>
                <ModalServiceDetails serviceId={service.id} />
            </ServiceProviderName>
            <ServicePreferredHour>
                Preferred hour: {service.preferredHour ? `${service.preferredHour[0]} to ${service.preferredHour[1]}` : 'Not Found'}{' '}
            </ServicePreferredHour>
            <div style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: 'auto auto', justifyItems: 'space-apart' }}>
                <ServiceTypeTag>{service.type} </ServiceTypeTag>
                <ServicePrice>Rate: {service.hourlyRate}$ </ServicePrice>
            </div>

            <SubmitButton onClick={orderService}> Request Service </SubmitButton>
        </ServiceSummaryContainer>
    );
};

const SubmitButton = styled.button`
    background: #14ab72;
    border: #14ab72;
    transition: 1000ms;
    color: white;
    margin: 10px;
    font-size: 18px;
    padding: 4px;
    border-radius: 4px;
    &:hover {
        cursor: pointer;
    }
`;

const ServicePreferredHour = styled.div`
    font-size: 16px;
    text-align: start;
    margin-left: 10px;
`;

const ServicePrice = styled.div`
    font-size: 24px;
    text-align: end;
    margin-right: 5px;
    color: #50545c;
`;

export const ServiceTypeTag = styled.div`
    font-size: 12px;
    text-align: center;
    margin: 0px 10px;
    align-self: center;
    // border: 1px solid grey;
    padding: 4px;
    background: #e6e8e7;
    border-radius: 4px;
`;

const ServiceTitle = styled.div`
    font-size: 24px;
    text-align: start;
    margin: 0px 10px;
    color: #50545c;
    font-weight: bold;
`;

const ServiceProviderName = styled.div`
    font-size: 16px;
    text-align: start;
    margin: 0px 10px;
    display:grid;
    grid-template-columns; 1fr auto;
`;

const ServiceDescription = styled.div`
    font-size: 12px;
    text-align: start;
    margin: 0px 10px;
    color: grey;
`;

const ServiceSummaryContainer = styled.div`
    display: grid;
    max-height: 100%;
    border-radius: 4px;
    border: 1px solid #e6e8e7;
    grid-row-gap: 0px;
    // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
`;
