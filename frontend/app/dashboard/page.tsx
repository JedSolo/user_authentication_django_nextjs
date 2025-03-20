'use client';

import { useRetrieverUserQuery } from "@/redux/features/authApiSlice";
import { List, Spinner } from "@/components/common";

export default function Page(){
    const { data: user, isLoading, isFetching } = useRetrieverUserQuery();

    const config = [
        {
            label: 'Name',
            value: user?.name
        },
        {
            label: 'Email',
            value: user?.email
        },
        {
            label: 'Phone',
            value: user?.phone
        }
    ];

    if (isLoading || isFetching) {
        return (
            <div className="flex justify-center my-8">
                <Spinner lg />
            </div>
        )
    };

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Dashboard
                    </h1>
                </div>
            </header>
            <main>
                <List config={config} />
            </main>
        </>
        
    );
}