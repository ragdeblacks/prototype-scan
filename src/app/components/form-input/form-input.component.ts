import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent {
  @Input() labelText = '';
  @Input() errors: any;
  @Input() dirty: any;
  @Input() typeInput = '';
  @Input() controlName: any;
  @Input() msgError: any;
  @Input() myForm: any;
  @Input() objForm: any;
  @Input() errorMessage: any;
  @Input() disabledInput = false;
  @Input() brmaskerInputl = {};
  @Output() addRFC = new EventEmitter<any>();
  @Output() onquerySepomex = new EventEmitter<any>();
  @Output() onblur = new EventEmitter<string>();

  getError(controlName: any): string {
    const element = this.myForm.get(controlName);
    const key = Object.keys(element.errors)[0];
    return this.errorMessage[controlName][key.toString()];
  }
  upperCase(data: string): any {
    this.addRFC.emit({ data });
  }
  querySepomex(data: string): any {
    this.onquerySepomex.emit({ data });
  }
  onLeaveInput(e) {
    if (e?.target?.value) {
      this.onblur.emit(e.target.value)
    }
  }
}
