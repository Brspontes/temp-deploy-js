export interface CompanyProfileResponse {
    idUserLogin: string;
    profileId: string;
    name: string;
    countryCode?: string;
    phoneNumber?: string;
    instagramLink?: string;
    facebookLink?: string;
    linkedinLink?: string;
    profilePicture?: string;
    description?: string;
    location?: string;
    personalInformationId?: string;
    nif?: string;
}

// Interfaces antigas mantidas para compatibilidade, se necessário
export interface CompanyProfileInfo {
    idUserLogin: string;
    name?: string;
    countryCode?: string;
    phoneNumber?: string;
    instagramLink?: string;
    facebookLink?: string;
    linkedinLink?: string;
    description?: string;
    profilePicture?: string;
}

export interface CompanyLegalInformation {
    idUserLogin: string;
    personalId?: string;
    personalIdValidyt?: string;
    nif?: string;
}
