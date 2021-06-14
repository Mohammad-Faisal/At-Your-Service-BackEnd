import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonFormSubmit from '../../buttons/ButtonFormSubmit';
import useFormInputValidation from '../../forms/common/useFormInputValidation';
import * as Yup from 'yup';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import { AnyObjectSchema } from 'yup';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { OrderAction } from '../../../store/order/OrderAction';
import { Rate } from 'antd';
import { FormInputTextArea } from '../../forms/common/FormInputTextArea';
import styled from 'styled-components';
import { GiveReviewRequest } from '../../../store/order/requests/GiveReviewRequest';

const INITIAL_STATE = {
    review: '',
};

const VALIDATION_SCHEMA: AnyObjectSchema = Yup.object({});
interface IModalReviewOrder {
    orderId: number;
}
export const FormGiveOrderReview: FC<IModalReviewOrder> = ({ orderId }: any) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(2.5);

    const { control, values } = useFormInputValidation(INITIAL_STATE, VALIDATION_SCHEMA);
    const isRequesting = useSelector((state) => selectRequesting(state, [OrderAction.GIVE_REVIEW]));
    const isFinished = useSelector((state) => selectFinished(state, [OrderAction.GIVE_REVIEW]));

    useEffect(() => {
        if (isFinished) control.resetData();
    }, [isFinished]);

    const onSubmit = () => {
        const review = values.review;
        dispatch(OrderAction.giveReview(new GiveReviewRequest(orderId, rating, review)));
    };

    const onRatingChange = (newValue) => setRating(newValue);

    return (
        <FormReviewStyle>
            <Rate allowHalf defaultValue={2.5} value={rating} onChange={onRatingChange} />
            <FormInputTextArea control={control} label={''} name={'review'} />
            <ButtonFormSubmit title={'Submit Review'} isRequesting={isRequesting} control={control} onSubmit={onSubmit} />
        </FormReviewStyle>
    );
};

const FormReviewStyle = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    justify-items: center;
    grid-row-gap: 10px;
`;
