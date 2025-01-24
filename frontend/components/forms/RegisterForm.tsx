'use client';

import { useRegister } from "@/hooks";
import { Form } from '@/components/forms';

export default function RegisterForm() {
    const {
        phone,
        name,
        email,
        password,
        re_password,
        isLoading,
        onChange,
        onSubmit
    } = useRegister();

    const config = [
        {
            labelText: 'Phone',
            labelId: 'phone',
            type: 'text',
            value: phone,
            required: true,
        },
        {
            labelText: 'Name',
            labelId: 'name',
            type: 'text',
            value: name,
            required: true,
        },
        {
            labelText: 'Email Address',
            labelId: 'email',
            type: 'email',
            value: email,
            required: true,
        },
        {
            labelText: 'Password',
            labelId: 'password',
            type: 'password',
            value: password,
            required: true,
        },
        {
            labelText: 'Confirm Password',
            labelId: 're_password',
            type: 'password',
            value: re_password,
            required: true,
        },
    ];

    return (
        <Form
            config={config}
            isLoading={isLoading}
            btnText="Sign Up"
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}