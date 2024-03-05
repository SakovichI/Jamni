import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  public errorModal: boolean = false;
  public errorMessage: string = '';
  public successModal: boolean = false;
  public successMessage: string = '';
  constructor() {}

  showError(text: string) {
    this.errorMessage = text;
    this.errorModal = !this.errorModal;
  }
  showSuccess(text: string) {
    this.successMessage = text;
    this.successModal = !this.successModal;
  }
}
