import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageEnum } from '@app/core/enum/storageEnum.enum';
import { ToastIcons } from '@app/core/enum/toast.enum';
import { UrlNavigation } from '@app/core/enum/urlNavigation.enum';
import { AlgorithmHelper } from '@app/core/helpers/algorithm.helper';
import { FormInformation } from '@app/core/models/form-information.model';
import { ScannerData } from '@app/core/models/scannerData';
import { DataService } from '@app/core/services/data.service';
import { OCR, OCRResult, OCRSourceType } from '@ionic-native/ocr/ngx';
import { NavController, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  title: string;
  optionSelect = 'scan';
  /* ELEMENTS WITH FITST STEP */
  wizardShow = false;
  scanner: any;
  IMAGE_PATH = '';
  dataPersonal: ScannerData;
  showText = false;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public ocr: OCR,
    public helper: AlgorithmHelper,
    public route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.title = 'Escanea el INE de tu prospecto para obtener sus datos personales y dirección, después de escanear podrás editar los datos.';
    this.getPhoto();
  }
  getPhoto() {
    this.route.queryParams
      .subscribe(params => {
        if (localStorage.getItem('list_photo') != null) {
          const image = JSON.parse(localStorage.getItem('list_photo') || '')
          this.IMAGE_PATH = image[0];
        }

      });
  }

  goToUrl(url: string): void {
    this.navCtrl.navigateForward(url);
  }

  /* ELEMENTS WITH FITST STEP */
  changeStatusWizard() {
    localStorage.setItem(StorageEnum.scannerGrabber, '1');
    this.goToGrabber();
  }

  goToGrabber() {
    this.scanner = JSON.parse(localStorage.getItem(StorageEnum.scannerGrabber));
    if (this.scanner === null) {
      this.wizardShow = true;
      this.title = 'Para garantizar una correcta captura de informacion, asegurate de seguir los siguientes pasos:';
    } else {
      this.wizardShow = false;
      this.IMAGE_PATH = '';
      this.title = 'Escanea el INE de tu prospecto para obtener sus datos personales y dirección, después de escanear podrás editar los datos.';
      this.navCtrl.navigateForward(UrlNavigation.grabber, { queryParams: { type: 1 } });
    }
  }
  goToMember() {
    const data: Partial<FormInformation> = {
      lastName: this.dataPersonal.lastName,
      surname: this.dataPersonal.surname,
      names: this.dataPersonal.name,
      RFC: null,
      CURP: this.dataPersonal.curp,
      address: this.dataPersonal.street,
      suburbPopulation: this.dataPersonal.colony,
      delegationMunicipality: this.dataPersonal.municipality,
      city: this.dataPersonal.municipality,
      state: this.dataPersonal.state,
      CP: this.dataPersonal.cp,
      birthday: this.dataPersonal.birthday,
    }
    this.dataService.setData(data)
    this.navCtrl.navigateForward(UrlNavigation.validationForm);
  }
  scan() {
    if (this.IMAGE_PATH !== '') {
      if (this.platform.is('cordova')) {
        //console.log(this.IMAGE_PATH.split('base64,')[1]);
        this.ocr.recText(OCRSourceType.BASE64, this.IMAGE_PATH.split('base64,')[1])
          .then((res: OCRResult) => {
            const result = res;
            console.log(result);
            if (result.foundText !== false) {
              this.showText = true;
              const textArray = result.lines.linetext;
              const birthday = this.helper.findKey('FECHA DE NACIM', textArray);
              if (birthday != undefined) {
                const nameComplete = this.helper.findKeyAlterA('NOMB', textArray);
                const address: any = this.helper.findKeyAlterA('DOMIC', textArray);
                const curp = this.helper.findKey('CURP', textArray);
                const divColony = address.colony.split(' ');
                const contdiv = Object.values(divColony).length;
                const clearColony = address.colony.replace(divColony[(contdiv - 1)], '');
                this.dataPersonal = {
                  nameComplete: nameComplete.nameComplete,
                  birthday,
                  curp,
                  street: address.street,
                  colony: clearColony,
                  state: address.state.replace('.', ''),
                  municipality: address.municipality,
                  cp: divColony[(contdiv - 1)],
                  name: nameComplete.name,
                  lastName: nameComplete.lastName,
                  surname: nameComplete.surname
                };
              } else {
                const nameComplete = this.helper.findKey('NOMB', textArray);
                const address: any = this.helper.findKey('DOMIC', textArray);
                const curp = this.helper.findKey('CURP', textArray);
                const divColony = address.colony.split(' ');
                const contdiv = Object.values(divColony).length;
                const clearColony = address.colony.replace(divColony[(contdiv - 1)], '');
                this.dataPersonal = {
                  nameComplete: nameComplete.nameComplete,
                  curp,
                  birthday: '',
                  street: address.street,
                  colony: clearColony,
                  state: address.state.replace('.', ''),
                  municipality: address.municipality,
                  cp: divColony[(contdiv - 1)],
                  name: nameComplete.name,
                  lastName: nameComplete.lastName,
                  surname: nameComplete.surname
                };
              }
            } else {
              this.showToast('No se ha encontrado texto en la imagen', ToastIcons.warningCircle);
            }
          }).catch((error: any) => console.log(error));
      }
    }
  }

  async showToast(msg, icon?) {
    const toast = await this.toastCtrl.create({
      animated: true,
      translucent: false,
      cssClass: 'custom-toast',
      message: msg,
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: icon ? icon : ToastIcons.checkmarkCircle,
          role: 'cancel',
          handler: () => { }
        }
      ],
      duration: 2500
    });
    toast.present().then(_ => {
      console.log('entra');
    });
  }
  skipScan() {
    this.navCtrl.navigateForward(UrlNavigation.validationForm);
  }
}
