import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageEnum } from '@app/core/enum/storageEnum.enum';
import { Sepomex } from '@app/core/models/sepomex';
import { States } from '@app/core/models/states';
import { DataService } from '@app/core/services/data.service';
import StatesList from '@app/mocks/states.json';
import { NavController } from '@ionic/angular';
import { SubSink } from 'subsink';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { FormInformation } from '@app/core/models/form-information.model';
import { ConnectionService } from '@app/core/services/connection.service';

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.page.html',
  styleUrls: ['./validation-form.page.scss'],
})
export class ValidationFormPage implements OnInit {
  title: string;
  optionSelect = 'valid';

  errorMessage: any = {
    names: {
      pattern: 'Este campo solo acepta letras',
      maxLength: 'El nombre no debe tener mas de 30 caracteres',
      required: 'Campo obligatorio'
    },
    lastName: {
      pattern: 'Este campo solo acepta letras',
      maxLength: 'El Apellido Paterno no debe tener mas de 30 caracteres',
      required: 'Campo obligatorio'
    },
    surname: {
      pattern: 'Este campo solo acepta letras',
      maxLength: 'El Apellido Materno no debe tener mas de 30 caracteres'
    },
    RFC: {
      required: 'Campo obligatorio'
    },
    CURP: {
      required: 'Campo obligatorio',
      minlength: 'El CURP no puede tener menos de 18 caracteres',
      maxlength: 'El CURP no puede tener mas de 18 caracteres'
    },
    address: {
      required: 'Campo obligatorio'
    },
    suburbPopulation: {
      required: 'Campo obligatorio'
    },
    delegationMunicipality: {
      required: 'Campo obligatorio'
    },
    city: {
      required: 'Campo obligatorio'
    },
    state: 'No ha seleccionado un state',
    CP: {
      required: 'Campo obligatorio',
      minlength: 'El CP no puede tener menos de 5 caracteres',
      maxLength: 'El CP no debe tener mas de 5 caracteres',
      pattern: 'Este campo solo acepta numeros'
    },
    phone: {
      required: 'Campo obligatorio',
      minlength: 'El numero de phone no puede tener menos de 5 caracteres',
      maxLength: 'El numero de phone no debe tener mas de 5 caracteres',
      pattern: 'Este campo solo acepta numeros'
    },
    contractAmount: {
      required: 'Campo obligatorio'
    },
    birthday: {
      required: 'Campo obligatorio'
    },
    email: {
      required: 'Campo obligatorio',
      pattern: 'Formato de correo no es correcto'
    }
  };

  get lengua() {
    return this.userProspect.get('lengua');
  }
  get etnia() {
    return this.userProspect.get('etnia');
  }
  get facebook() {
    return this.userProspect.get('facebook');
  }
  get names() {
    return this.userProspect.get('names');
  }
  get lastName() {
    return this.userProspect.get('lastName');
  }
  get surname() {
    return this.userProspect.get('surname');
  }
  get RFC() {
    return this.userProspect.get('RFC');
  }
  get CURP() {
    return this.userProspect.get('CURP');
  }
  get city() {
    return this.userProspect.get('city');
  }
  get state() {
    return this.userProspect.get('state');
  }
  get CP() {
    return this.userProspect.get('CP');
  }
  get delegationMunicipality() {
    return this.userProspect.get('delegationMunicipality');
  }
  get suburbPopulation() {
    return this.userProspect.get('suburbPopulation');
  }
  get address() {
    return this.userProspect.get('address');
  }
  get phone() {
    return this.userProspect.get('phone');
  }
  get email() {
    return this.userProspect.get('email');
  }
  get contractAmount() {
    return this.userProspect.get('contractAmount');
  }
  get birthday() {
    return this.userProspect.get('birthday');
  }

  colonyElements = [];
  subs: SubSink = new SubSink();
  sepomex: Sepomex;
  colonyFilter = false;
  states: States[];
  errorState = false;
  stateValue = '';
  textTrim: string = '';
  colNormal = true;
  disabledColony = false;
  errorColony = false;
  colonyValue = '';
  customPickerOptions = {
    buttons: [{
      text: 'Cancelar',
      handler: () => {
        return false;
      }
    },
    {
      text: 'Seleccionar',
      handler: (res: any) => {
        this.userProspect.patchValue({
          birthday:
            res.year.value
            + '-' +
            ((res.month.value < 10) ? '0' + res.month.value : res.month.value)
            + '-' +
            ((res.day.value < 10) ? '0' + res.day.value : res.day.value)
        });
        console.log(this.birthday);
      }
    }]
  };
  amountDat = '';
  userProspect: FormGroup;
  location: { x: string | number, y: string | number };
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public currency: CurrencyPipe,
    private dataService: DataService,
    private nativeGeocoder: NativeGeocoder,
    private connectionService: ConnectionService
  ) {
    this.states = StatesList.states;
  }

  ngOnInit() {
    this.title = 'Verifica que los datos son correctos, agrega tus datos de contacto y redes sociales. Asegúrate que no tengas algún campo vacío para poder continuar';
    this.initForm();
    this.getDataPersonal();
  }

  initForm() {
    this.userProspect = this.formBuilder.group({
      lastName: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ." "]*'), // acepta solo carcteres y .(punto)
        Validators.required])],
      surname: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ." "]*')])], // acepta solo carcteres y .(punto)
      names: ['', Validators.compose([
        Validators.maxLength(30), // 30 digitos maximos
        Validators.pattern('[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ." "]*'), // acepta solo carcteres y .(punto)
        Validators.required])],
      RFC: ['', Validators.required],
      CURP: ['', Validators.compose([
        Validators.required, // Campo requerido
        Validators.minLength(18), // 18 digitos minimo
        Validators.maxLength(18)])], // 18 digitos maximos
      address: ['', Validators.required],
      suburbPopulation: ['', Validators.required],
      delegationMunicipality: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      CP: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern('[^\d]*')])],
      birthday: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.required, // Campo requerido
        Validators.minLength(10), // 10 digitos minimo
        Validators.maxLength(10), // 10 digitos maximos
        Validators.pattern('[0-9]*')])], // solo acepta digitos numericos
      email: ['', Validators.compose([Validators.required])],
      facebook: ['https://www.facebook.com/'],
      lengua: [''],
      etnia: ['']
    });
  }

  goToUrl(url: string): void {
    this.navCtrl.navigateForward(url);
  }

  getError(controlName: any): string {
    const element = this.userProspect.get(controlName);
    const key = Object.keys(element.errors)[0];
    return this.errorMessage[controlName][key.toString()];
  }

  getDataPersonal() {
    const savedInfo = localStorage.getItem(StorageEnum.userData);
    const email = savedInfo && JSON.parse(savedInfo)?.email;
    this.dataService.data$.subscribe((params) => {
      if (params.CP) {
        this.getLatLon(params.city);
      }
      if (Object.values(params).length !== 0) {
        const rfc: string = this.convertRFC(params.CURP);
        this.userProspect.patchValue({
          names: this.clearString(params.names, 1),
          surname: this.clearString(params.surname, 1),
          lastName: this.clearString(params.lastName, 1),
          address: this.clearString(params.address, 1),
          CP: this.clearString(params.CP, 0),
          CURP: this.clearString(params.CURP, 0),
          RFC: rfc,
          birthday: params.birthday,
          city: this.clearString(params.city, 1),
          delegationMunicipality: this.clearString(params.delegationMunicipality, 1),
          suburbPopulation: this.clearString(params.suburbPopulation, 1),
          state: this.clearString(params.state, 1),
          email: this.clearString(email || params.email, 0),
          facebook: this.clearString(params.facebook, 1),
          etnia: this.clearString(params.etnia, 1),
          lengua: this.clearString(params.lengua, 1),
        });
        const filterState = this.states.filter(elem => elem?.value === params.state);
        this.stateValue = filterState[0].value;
      }
    });
  }

  getLatLon(city: string) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      defaultLocale: 'es_MX',
      maxResults: 4
    };
    this.nativeGeocoder.forwardGeocode(city, options)
      .then((result: NativeGeocoderResult[]) => {
        const fromMex = result.find(el => el.countryCode === 'MX')
        if (fromMex) {
          this.location = { x: fromMex.longitude, y: fromMex.latitude }
        } else {
          this.location = null;
        }
      })
      .catch((error: any) => console.warn(error));
  }

  loadAnotherItem() {
    const userData: FormInformation = {
      names: this.clearString(this.names.value.value, 1),
      surname: this.clearString(this.surname.value, 1),
      lastName: this.clearString(this.lastName.value, 1),
      address: this.clearString(this.address.value, 1),
      CP: this.clearString(this.CP.value, 0),
      CURP: this.clearString(this.CURP.value, 0),
      RFC: this.RFC.value,
      birthday: this.birthday.value,
      city: this.clearString(this.city.value, 1),
      delegationMunicipality: this.clearString(this.delegationMunicipality.value, 1),
      suburbPopulation: this.clearString(this.suburbPopulation.value, 1),
      state: this.clearString(this.state.value, 1),
      email: this.clearString(this.email.value, 0),
      phone: this.phone.value,
      facebook: this.clearString(this.facebook.value, 1),
      etnia: this.clearString(this.etnia.value, 1),
      lengua: this.clearString(this.lengua.value, 1),
      location: this.location
    };
    this.dataService.setData(userData);
    this.connectionService.setData(userData).subscribe(res => {
      console.log('Data saved', res);
    }, err => {
      console.log(err);
    });

  }

  clearString(text: string, type: number): string {
    if (!(text?.length)) {
      return '';
    }
    this.textTrim = text;
    const cad = (type === 1) ? this.textTrim.replace(/\s+/gi, ' ').toUpperCase() : this.textTrim.replace(/\s+/gi, ' ');
    return cad;
  }

  upperCase(obj: any): void {
    const cad: string = obj.data;
    const rfc: string = this.convertRFC(cad);
    this.userProspect.patchValue({
      RFC: rfc
    });
  }
  convertRFC(cad: string): string {
    if (!cad?.length) {
      return '';
    }
    const x = cad.substring(0, 10);
    return x;
  }
  querySepomex(value: any): any {
    const cp = value;
    if (cp.length === 5) {
      const data = {
        zipcode: cp
      };
      this.colonyElements = [];

    }
  }

  editColony() {
    if (this.suburbPopulation.value !== '') {
      this.colNormal = false;
    }
  }

  cancelEdit() {
    this.colNormal = true;
  }
}
