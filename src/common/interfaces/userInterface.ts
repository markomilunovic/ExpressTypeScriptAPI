interface UserCreateRequestBody {
    username: string;
    password: string;
    email: string,
    firstName: string,
    lastName: string
};

interface UserUpdateRequestBody {
    username?: string;
    password?: string;
    email?: string,
    firstName?: string,
    lastName?: string
};

interface User {
    id: number;
    username: string;
    password: string;
    email: string,
    firstName: string,
    lastName: string
};

export type{
    UserCreateRequestBody,
    UserUpdateRequestBody,
    User
};