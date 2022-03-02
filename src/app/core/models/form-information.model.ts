export interface FormInformation {
    lastName: string;
    surname: string;
    names: string;
    RFC: string;
    CURP: string;
    address: string;
    suburbPopulation: string;
    delegationMunicipality: string;
    city: string;
    state: string;
    CP: string;
    birthday: string;
    phone: string;
    email: string;
    facebook: string;
    lengua: string;
    etnia: string;
    location?: { x: number | string, y: number | string } | null
}