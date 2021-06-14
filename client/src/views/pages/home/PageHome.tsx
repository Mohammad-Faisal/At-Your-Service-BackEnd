import React, { useEffect } from 'react';
import { FormFilterService } from './FormFilterService';
import { useDispatch, useSelector } from 'react-redux';
import { selectServices } from '../../../store/service/ServiceSelector';
import { IndividualService } from './IndividualService';
import styled from 'styled-components';
import { ServiceAction } from '../../../store/service/ServiceAction';
import { GetFilteredServicesRequests } from '../../../store/service/requests/GetFilteredServicesRequests';

export const PageHome = () => {
    const services = useSelector(selectServices);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ServiceAction.getFilteredServices(new GetFilteredServicesRequests()));
    }, []);

    return (
        <HomePageContainer>
            <FormFilterService />
            <ServicesContainer>
                {services.map((service) => (
                    <IndividualService service={service} />
                ))}
            </ServicesContainer>
        </HomePageContainer>
    );
};

const ServicesContainer = styled.div`
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
`;

const HomePageContainer = styled.div`
    display: grid;
    margin: 20px;
    grid-template-columns: 1fr 3fr;
`;
