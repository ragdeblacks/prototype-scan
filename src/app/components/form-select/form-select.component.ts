import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent {
  @Input() labelText = '';
  @Input() errors: any;
  @Input() controlName: any;
  @Input() msgError: any;
  @Input() myForm: any;
  @Input() objForm: any;
  @Input() errorMessage: any;
  @Input() disabledSelect = false;
  @Input() valueSelect = false;
  @Input() listSelect = false;

  validSelector() {
    if (this.objForm.value) {
      this.errors = false;
    }
  }

}
