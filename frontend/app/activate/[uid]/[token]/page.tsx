'use client';

import { use } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActivationMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";


export default function Page({ params }: { params: Promise<{uid: string; token: string}>}){
    const router = useRouter();
    const [activation] = useActivationMutation();
    const { uid, token } = use(params);

    useEffect(() => {

        activation({ uid, token })
            .unwrap()
            .then(() => {
                toast.success('Account activated')
            })
            .catch(() => {
                toast.error('Falied to activate account')
            })
            .finally(() => {
                router.push('/auth/login')
            })
    }, []);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Activating your Account...
                </h1>
            </div>
        </div>
    );
}