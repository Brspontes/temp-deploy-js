export interface IRegister {
    name: string;
    email: string;
    location: string;
    countryCode: string;
    phoneNumber: string;
    password: string;
    confirmedPassword: string;
    acceptedTerm: boolean;
    nif: string;
}

export interface IRegisterResponse {
    id?: string;
    name?: string;
}