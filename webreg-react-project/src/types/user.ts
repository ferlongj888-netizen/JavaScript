export interface BaseUser {
    email: string;
    username: string;
}

export interface CreateUser extends BaseUser {
    password: string;
}

export interface User extends BaseUser {
    id: string;
    created_at: string;
}

export interface UserLoginRequest {
    username: string;
    password: string;
}

export interface UserLoginResponse {
    access_token: string;
    token_type: string;
    user_id: string;
    username: string;
}