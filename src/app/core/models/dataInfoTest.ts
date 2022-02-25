import { ConsultationEspanol } from './consultation-espanol';
import { ScannerData } from './scannerData';

export interface DataInfoTest {
    url: string;
    username: string;
    data: {
        username: string
    };
    file: {
        page: string,
        method: string,
        type: string
    };
    message: string;
    clientForm: {
        client: string,
        idDocuments: string,
        addresses: string,
        customInformation: string
    };
    group: {
        id: string
    };
    idGroup: string;
    idClient: string;
    timeNow: string;
    timeOut: string;
    timeOutFake: string;
    loggetIn: any;
    nip: string;
    prospecto: {
        username: string
    };
    response: {
        status: string,
        message: string,
        data: {
            username: string,
            picture: string
        }
    };
    status: string;
    groups: DetailObjec[];
    detailsGroups: {
        clients: DetailObjec[]
    };
    log: {
        origin: string,
        page: string,
        method?: string,
        type?: string,
        message?: string,
        date?: string
    };
    loginInfo: {
        data: {
            username: string,
            picture: string,
            email: string
        }
    };
    documento: string;
    formData: {
        value: string;
    };
    date: string;
    datetime: string;
    directoryEntry: {
        filesystem: {
            name: string;
            root: string;
        },
        fullPath: string;
        isDirectory: boolean;
        isFile: boolean;
        name: string;
        nativeURL: string;
        createReader?: any;
        getFile?: any;
        getDirectory?: any;
        removeRecursively?: any;
        getMetadata?: any;
        moveTo?: any;
        copyTo?: any;
        toURL?: any;
        toInternalURL?: any;
        remove?: any;
        getParent?: any;
    };
    fileError: {
        code: number;
        message: string;
    };
    fileEntry: {
        filesystem: {
            name: string;
            root: string;
        },
        fullPath: string;
        isDirectory: boolean;
        isFile: boolean;
        name: string;
        nativeURL: string;
    };
    ConsultationEspanol: ConsultationEspanol;
    querySepomex: {
        status: string,
        message: string,
        data: {
            municipio: string,
            estado: string,
            ciudad: string,
            colonias: any[];
        }
    };
    querySepomexTwo: {
        status: string,
        message: string,
        data: {
            municipio: string,
            estado: string,
            ciudad: string,
            colonias: any[];
        }
    };
    dataPersonal: ScannerData;
    ocrText: {
        foundText: boolean;
        lines: {
            linetext: string[];
        }
    };
    ocrTextNo: {
        foundText: boolean;
    };
    ocrTextBirthday: {
        foundText: boolean;
        lines: {
            linetext: string[];
        }
    };
    dataPersonal2: {
        nameComplete?: string;
        name?: string;
        lastName?: string;
        surname?: string;
        street?: string;
        state?: string;
        city?: string;
        colony?: string;
        municipality?: string;
        birthday?: string;
        curp?: string;
        cp?: string;
        contractAmount?: string;
    };
}
export interface DetailObjec {
    id: string;
    name: string;
}
