'use client';

import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth, finishIntialLoad } from '@/redux/features/authSlice';
import { useVerifyMutation } from '@/redux/features/authApiSlice';

export default function Setup() {
    const dispatch = useAppDispatch();
    const [verify] = useVerifyMutation();

    useEffect(() => {
        const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
        if (token) {
            verify({ token })
                .unwrap()
                .then(() => {
                    dispatch(setAuth());
                })
                .catch((error) => {
                    toast.error("Session expired, please log in again.");
                    console.error("Token verification failed:", error);
                    localStorage.removeItem("authToken"); // save token to localStorage
                })
                .finally(() => {
                    dispatch(finishIntialLoad());
                });
        } else {
            dispatch(finishIntialLoad());
        }
    }, [dispatch, verify]);

    return <ToastContainer />;
}