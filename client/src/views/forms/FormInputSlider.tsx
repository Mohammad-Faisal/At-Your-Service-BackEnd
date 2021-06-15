import { Form, Radio, Slider } from 'antd';
import React from 'react';
import { IControl } from './useFormInputValidation';
import SelectionItemModel from './SelectionItemModel';
import { ServiceType } from '../../constants/GeneralConstants';

export interface IRadioInput {
    step: number;
    range: number[];
    control: IControl;
    label: string;
    name: string;
    isControlledManually?: boolean;
    value?: string | number | boolean;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
}

export const FormInputSlider = (props: IRadioInput) => {
    const isTouched = props.control.touched[`${props.name}`];
    const error = props.control.errors[`${props.name}`];
    const value = props.isControlledManually ? props.value : props.control.values[`${props.name}`];

    return (
        <Form.Item label={props.label} hasFeedback validateStatus={isTouched ? (error ? 'error' : '') : ''} help={isTouched ? error : ''}>
            <Slider
                value={value}
                onChange={(value) => props.control.handleInputChange(props.name, value)}
                range
                step={props.step}
                min={props.range[0]}
                max={props.range[1]}
            />
        </Form.Item>
    );
};
