import { Injectable } from '@angular/core';

export class MockLoading {
    public visible: boolean;

    constructor(props: any) {
        Object.assign(this, props);
        this.visible = false;
    }

    present() {
        this.visible = true;
        return Promise.resolve();
    }

    dismiss() {
        this.visible = false;
        return Promise.resolve();
    }

}

export class MockLoadingController {
    public visible: boolean;
    public created: MockLoading[];

    constructor() {
        this.created = [];
    }

    present() {
        this.visible = true;
        return Promise.resolve();
    }
    create(props: any): Promise<any> {
        const toRet = new MockLoading(props);
        this.created.push(toRet);
        return Promise.resolve(toRet);
    }

    getLast() {
        if (!this.created.length) {
            return null;
        }
        return this.created[this.created.length - 1];
    }

    dismiss() {
        return Promise.resolve();
    }
}

export class MockAlert {
    public visible: boolean;
    public header: string;
    public message: string;

    constructor(props: any) {
        Object.assign(this, props);
        this.visible = false;
    }

    present() {
        this.visible = true;
        return Promise.resolve();
    }

    dismiss() {
        this.visible = false;
        return Promise.resolve();
    }

    onWillDismiss() {
        return Promise.resolve({ data: {} });
    }

}

export class MockAlertController {

    public created: MockAlert[];

    constructor() {
        this.created = [];
    }

    create(props: any): Promise<any> {
        const toRet = new MockAlert(props);
        this.created.push(toRet);
        return Promise.resolve(toRet);
    }

    public getLast() {
        if (!this.created.length) {
            return null;
        }
        return this.created[this.created.length - 1];
    }

    public onDidDismiss() {
        return Promise.resolve({});
    }
}

export class MockModal {
    public visible: boolean;
    public header: string;
    public message: string;

    constructor(props: any) {
        Object.assign(this, props);
        this.visible = false;
    }

    present() {
        this.visible = true;
        return Promise.resolve();
    }

    dismiss() {
        this.visible = false;
        return Promise.resolve();
    }
}

export class MockModalController {

    public created: MockAlert[];

    constructor() {
        this.created = [];
    }

    create(props: any): Promise<any> {
        const toRet = new MockAlert(props);
        this.created.push(toRet);
        return Promise.resolve(toRet);
    }

    getLast() {
        if (!this.created.length) {
            return null;
        }
        return this.created[this.created.length - 1];
    }

    dismiss(props: any = {}) {
        return true;
    }

    onWillDismiss = () => {
        Promise.resolve({ data: {} });
    }
}
export class MockToastController {
    public visible: boolean;
    public created: MockAlert[];

    constructor() {
        this.created = [];
    }
    create(props: any): Promise<any> {
        const toRet = new MockAlert(props);
        this.created.push(toRet);
        return Promise.resolve(toRet);
    }
    present() {
        this.visible = true;
        return Promise.resolve();
    }

    dismiss() {
        this.visible = false;
        return Promise.resolve();
    }

}
export class MockPopoverController {
    public visible: boolean;
    public created: MockAlert[];

    constructor() {
        this.created = [];
    }
    create(props: any): Promise<any> {
        const toRet = new MockAlert(props);
        this.created.push(toRet);
        return Promise.resolve(toRet);
    }
    present() {
        this.visible = true;
        return Promise.resolve();
    }

    dismiss() {
        this.visible = false;
        return Promise.resolve();
    }

}

@Injectable()
export class SocialSharingMock {
    share(text, title, images) {
        return Promise.resolve({});
    }
}