import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss'],
})
export class CaptureComponent {
  @Input() IMAGE_PATH: string;
  @Input() wizardShow: boolean;
  @Input() showText: boolean;
  @Input() dataPersonal: any;
  @Output() ongoToMember = new EventEmitter<any>();
  @Output() ongoToGrabber = new EventEmitter<any>();
  @Output() onscan = new EventEmitter<any>();

  goToMember(){
    this.ongoToMember.emit();
  }
  goToGrabber(){
    this.ongoToGrabber.emit();
  }
  scan(){
    this.onscan.emit();
  }
}
