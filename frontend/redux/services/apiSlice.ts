import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setAuth, logout } from '../features/authSlice';
import { Mutex } from 'async-mutex';

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('access');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshToken = localStorage.getItem('refresh');
                if (refreshToken) {
                    const refreshResult = await baseQuery(
                        {
                            url: '/jwt/refresh/',
                            method: 'POST',
                            body: { refresh: refreshToken },
                        },
                        api,
                        extraOptions
                    );
                    if (refreshResult.data) {
                        localStorage.setItem('access', refreshResult.data.access);
                        api.dispatch(setAuth());
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        localStorage.removeItem('access');
                        localStorage.removeItem('refresh');
                        api.dispatch(logout());
                    }
                } else {
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});
