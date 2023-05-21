export interface User {
    username: string;
    displayName: string;
    token: string;
    bio?: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface RegisterFormValues {
    displayName: string;
    email: string;
    password: string;
    username: string;
    bio: string;
}