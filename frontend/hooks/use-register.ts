import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";


export default function useRegister() {
    const router = useRouter();
    const [register, { isLoading }] = useRegisterMutation();

    const [formData, setFormData] = useState({
        phone: '',
        name: '',
        email: '',
        password: '',
        re_password: '',
    });

    const { phone, name, email, password, re_password } = formData;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        register({ phone, name, email, password, re_password })
            .unwrap()
            .then(() => {
                toast.success('Please check email to verify account')
                router.push('/api/login');
            })
            .catch(() => {
                toast.error('Failed to register account')
            })
    }

    return {
        phone, 
        name, 
        email, 
        password, 
        re_password,
        isLoading,
        onChange,
        onSubmit
    };
}