import cn from 'classnames';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    provider: 'google';
    children: React.ReactNode;
}

export default function SocialButton({ provider, children, ...rest }: Props) {
    const className = cn(
        'flex-l text-white rounded-md px-3 mt-3 py-2 font-medium',
        {
            'bg-red-500 hover:bg-red-400': provider === 'google'
        }
    );

    return (
        <button className={className} {...rest}>
            <span className='flex justify-start items-center'>{children}</span>
        </button>
    );
}