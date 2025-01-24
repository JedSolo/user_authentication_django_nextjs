'use client'

import { useLogin } from '@/hooks';
import { Form } from '@/components/forms';

export default function LoginForm() {
    const {
        phone, 
        password, 
        isLoading,
        onChange,
        onSubmit
    } = useLogin();

    const config = [
        {
            labelText: 'Phone',
            labelId: 'phone',
            type: 'text',
            value: phone,
            required: true,
        },
        {
            labelText: 'Password',
            labelId: 'password',
            type: 'password',
            value: password,
            link: {
                linkText: 'Forget password?',
                linkUrl: '/password-reset',
            },
            required: true,
        },
    ];

    return (
        <Form
            config={config}
            isLoading={isLoading}
            btnText="Login"
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}