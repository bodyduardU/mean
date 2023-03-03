export declare class User {
    id: number;
    username: string;
    email: string;
    image: string;
    password: string;
    hashPassword(): Promise<void>;
}
