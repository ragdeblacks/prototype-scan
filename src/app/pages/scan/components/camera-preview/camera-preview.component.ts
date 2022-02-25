import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageEnum } from '@app/core/enum/storageEnum.enum';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.component.html',
  styleUrls: ['./camera-preview.component.scss'],
})
export class CameraPreviewComponent implements OnInit {
  @Input() IMAGE_PATH = '';
  @Output() oncheckPhoto = new EventEmitter<any>();
  @Output() oncancelPhoto = new EventEmitter<any>();
  wizardShow = false;
  takeActive = false;
  showText = false;
  flash = false;
  flashMode = 'off';
  loading: HTMLIonLoadingElement;
  constructor(
    public loadingCtrl: LoadingController,
    public cameraPreview: CameraPreview,
    public platform: Platform
  ) { }
  widthW = window.screen.width;
  heightW = window.screen.height;
  cameraPreviewOpts: CameraPreviewOptions = { 
    width: this.widthW, 
    height: this.heightW - (Math.floor(this.heightW*50)/100),
    camera: 'rear',
    toBack: false,
    previewDrag: false,
    tapPhoto: true,
    alpha: 1,
    tapFocus: true,
    disableExifHeaderStripping: true
  };

  ngOnInit() {
    this.loadingCtrl
      .create({
        message: 'Por favor espere...',
      }).then((res) => {
        this.loading = res;
        this.loading.present();
        this.startCamera();
      });
  }
  startCamera() {
    if (this.platform.is('cordova')) {
      this.IMAGE_PATH = '';
      if (this.loading) {
        this.loading.dismiss();
      }
      this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
        (res) => {
          this.showText = false; 
          this.takeActive = true;
          
        },
        (err) => {
          console.log(err)
      });
    }
  }
  stopCamera() {
    if (this.platform.is('cordova')) {
      this.flashMode = 'off';
      this.cameraPreview.setFlashMode(this.flashMode);
      this.cameraPreview.stopCamera().then((step)=>{
        this.takeActive = false;
        this.oncancelPhoto.emit({status: true});
      });
    }
  }

  async takePicture() {
    await localStorage.removeItem(StorageEnum.listPhoto);
    if (this.platform.is('cordova')) {
      this.flashMode = 'off';
      this.cameraPreview.setFlashMode(this.flashMode);
      this.cameraPreview.takePicture({
        width: 400,
        height: 400,
        quality: 85
      }).then(async (imageData)  => {
        this.IMAGE_PATH = 'data:image/jpeg;base64,' + imageData;
        this.stopCamera();
        this.takeActive = false;
        let list = new Array();
        list.push(this.IMAGE_PATH);
        await localStorage.setItem(StorageEnum.listPhoto, JSON.stringify(list));
        setTimeout(()=>{
          this.oncheckPhoto.emit({status: true});
        },2000)
        
      }, (err) => {
        this.IMAGE_PATH = '';
      });
    }
  }

  changeFlashMode(event: any) {
    if(event.detail.checked){
      this.flashMode = 'torch';
    }else{
      this.flashMode = 'off';
    }
    if (this.platform.is('cordova')) {
      this.cameraPreview.setFlashMode(this.flashMode);
    }
  }

}
