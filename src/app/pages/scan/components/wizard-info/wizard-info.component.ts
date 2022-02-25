import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-wizard-info',
  templateUrl: './wizard-info.component.html',
  styleUrls: ['./wizard-info.component.scss'],
})
export class WizardInfoComponent {
  @Input() wizardShow = false;
  @Output() onchangeStatusWizard = new EventEmitter<any>();
  constructor() { }

  changeStatusWizard(){
    this.onchangeStatusWizard.emit();
  }

}
