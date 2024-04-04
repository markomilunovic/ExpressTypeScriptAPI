interface UserRegisterRequestBody {
    username: string;
    password: string;
    email: string,
    firstName: string,
    lastName: string
};

interface UserLoginRequestBody {
    password: string;
    email: string
};

interface ForgotPasswordRequestBody{
    email: string
};

interface ResetPasswordRequestBody{
    newPassword: string,
    token: string
};

interface User{
    id: number,
    username: string;
    password: string;
    email: string,
    firstName: string,
    lastName: string
};

interface Token{
    id: number,
    userId: number,
    expiresAt: Date
};

interface RefreshToken{
    id: number,
    accessTokenId: number,
    expiresAt: Date
};

export type{
    UserRegisterRequestBody,
    UserLoginRequestBody,
    ForgotPasswordRequestBody,
    ResetPasswordRequestBody,
    User,
    Token,
    RefreshToken
};