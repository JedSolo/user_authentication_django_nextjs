import { apiSlice } from "../services/apiSlice";

interface User {
    phone: string;
    name: string;
    email: string;
}

interface SocialAuthArgs {
    provider: string;
    state: string;
    code: string;
}

interface CreateUserResponse {
    success: boolean;
    user: User;
}
const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieverUser: builder.query<User, void>({
            query: () => '/users/me/'
        }),
        socialAuthenticate: builder.mutation<CreateUserResponse, SocialAuthArgs>({
            query: ({ provider, state, code }) => ({
                url: `/o/${provider}/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }),
        login: builder.mutation({
            query: ({ phone, password }) => ({
                url: '/jwt/create/',
                method: 'POST',
                body: { phone, password }
            }),

            transformResponse: (response: {refresh: string, access: string}) => response
        }),
        register: builder.mutation({
            query: ({ phone, name, email, password, re_password }) => ({
                url: '/users/',
                method: 'POST',
                body: { phone, name, email, password, re_password }
            })
        }),
        verify: builder.mutation({
            query: ({ token }) => ({
                url: '/jwt/verify/',
                method: 'POST',
                body: { token },
            })
        }),
        logout: builder.mutation({
            query: ({}) => ({
                url: '/logout/',
                method: 'POST',
            }),
        }),
        activation: builder.mutation({
            query: ({ uid, token }) => ({
                url: '/users/activation/',
                method: 'POST',
                body: { uid, token },
            })
        }),
        resetPassword: builder.mutation({
            query: (email) => ({
                url: '/users/reset_password/',
                method: 'POST',
                body: { email },
            })
        }),
        resetPasswordConfirm: builder.mutation({
            query: ({ uid, token, new_password, re_new_password }) => ({
                url: '/users/reset_password_confirm/',
                method: 'POST',
                body: { uid, token, new_password, re_new_password },
            })
        }),
    })
})

export const { 
    useRetrieverUserQuery, 
    useSocialAuthenticateMutation, 
    useLoginMutation,
    useRegisterMutation,
    useVerifyMutation,
    useLogoutMutation,
    useActivationMutation,
    useResetPasswordMutation,
    useResetPasswordConfirmMutation
} = authApiSlice;