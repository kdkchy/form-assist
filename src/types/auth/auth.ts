export type TAuthRequest = {
    email: string,
    password: string
}

export type TAuthResponse = {
    name: string,
    email: string,
    accessToken: string
}

export type TAuthState = {
    token: string | null,
    user: {
        name: string
        email: string
    } | null
}