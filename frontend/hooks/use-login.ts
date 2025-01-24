import { useLoginMutation } from "@/redux/features/authApiSlice";
import { toast } from 'react-toastify';
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";


export default function useLogin() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });

    const { phone, password } = formData;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        login({ phone, password })
            .unwrap()
            .then((response: string) => {
                dispatch(setAuth());
                toast.success('Logged in');
                localStorage.setItem("authToken", response)
                router.push('/dashboard');
            })
            .catch(() => {
                toast.error('Failed to Log in')
            })
    }

    return {
        phone, 
        password, 
        isLoading,
        onChange,
        onSubmit
    };
}