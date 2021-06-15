import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormBasicContainer } from '../../common-components/layout/FormStyles';
import ButtonFormSubmit from '../../common-components/buttons/ButtonFormSubmit';
import useFormInputValidation from '../../forms/useFormInputValidation';
import * as Yup from 'yup';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import { AnyObjectSchema } from 'yup';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { FormInputRadio, RadioTypes } from '../../forms/FormInputRadio';
import { ServiceAction } from '../../../store/service/ServiceAction';
import { FilterServiceInputs, GetFilteredServicesRequests } from '../../../store/service/requests/GetFilteredServicesRequests';
import { FormInputSlider } from '../../forms/FormInputSlider';
import styled from 'styled-components';
import { Button } from 'antd';

const INITIAL_STATE = {
    rateRange: [0, 99],
    ratingRange: [0, 5.0],
    type: null,
};

const VALIDATION_SCHEMA: AnyObjectSchema = Yup.object({});

export const FormFilterService: FC = () => {
    const dispatch = useDispatch();

    const { control, values } = useFormInputValidation(INITIAL_STATE, VALIDATION_SCHEMA);
    const isRequesting = useSelector((state) => selectRequesting(state, [ServiceAction.CREATE_SERVICE]));
    const isFinished = useSelector((state) => selectFinished(state, [ServiceAction.CREATE_SERVICE]));

    useEffect(() => {
        if (isFinished) control.resetData();
    }, [isFinished]);

    const onSubmit = () => {
        const newValues: FilterServiceInputs = {
            minRate: values.rateRange[0],
            maxRate: values.rateRange[1],
            minRating: values.ratingRange[0],
            maxRating: values.ratingRange[1],
            type: values.type ? values.type : null,
        };
        dispatch(ServiceAction.getFilteredServices(new GetFilteredServicesRequests(newValues)));
    };

    const resetForm = () => {
        control.resetData();
    };

    return (
        <FormBasicContainer>
            <FormInputSlider control={control} label={'Hourly Rate '} name={'rateRange'} range={[0, 99]} step={1} />
            <FormInputSlider control={control} label={'Rating'} name={'ratingRange'} range={[0, 5.0]} step={0.1} />
            <FormInputRadio control={control} label={'Service Type'} name={'type'} type={RadioTypes.SERVICE_TYPE} />
            <FormDoubleContainer>
                <Button size="large" type={'dashed'} onClick={resetForm}>
                    {'Clear'}
                </Button>
                <ButtonFormSubmit type={'primary'} title={'Get Services'} isRequesting={isRequesting} control={control} onSubmit={onSubmit} />
            </FormDoubleContainer>
        </FormBasicContainer>
    );
};

const FormDoubleContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
`;
