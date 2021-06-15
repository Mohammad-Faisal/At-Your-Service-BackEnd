import { Form, Input } from 'antd';
import React from 'react';
import { IControl } from './useFormInputValidation';

export interface ITextInput {
    control: IControl;
    label: string;
    name: string;
    isControlledManually?: boolean;
    value?: string | number | boolean;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
}

export const FormInputTextArea = (props: ITextInput) => {
    const isTouched = props.control.touched[`${props.name}`];
    const error = props.control.errors[`${props.name}`];
    const value = props.isControlledManually ? props.value : props.control.values[`${props.name}`];

    return (
        <Form.Item
            label={props.label}
            hasFeedback
            validateStatus={isTouched ? (error ? 'error' : value && value.length > 0 ? 'success' : '') : ''}
            help={isTouched ? error : ''}
        >
            <Input.TextArea
                onChange={(e) => props.control.handleInputChange(props.name, e.target.value)}
                value={props.control.values[`${props.name}`]}
                disabled={props.disabled}
                placeholder={props.placeholder}
                name={props.name}
            />
        </Form.Item>
    );
};
