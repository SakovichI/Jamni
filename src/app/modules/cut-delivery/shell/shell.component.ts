import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { GeneralService } from '../../../core/services/general.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit, OnDestroy {
  public email?: string;
  public address?: string;
  public deliveryMethod: 'courier' | 'self' = 'courier';
  constructor(
    public generalService: GeneralService,
    private loader: LoaderService
  ) {}

  public ngOnInit() {
    this.loader.setLoader(true);
    setTimeout(() => {
      const scripts: Element | null = document.querySelector(
        'script[src="assets/main.js"]'
      );
      if (scripts) {
        document.body.removeChild(scripts);
      }
      const script = document.createElement('script');
      script.src = 'assets/main.js';
      document.body.appendChild(script);
      this.loader.setLoader(false);
      this.loader.imgLoader();
    }, 500);
    if (localStorage.getItem('form')) {
      const savedForm: any = JSON.parse(localStorage.getItem('form') as string);
      this.email = savedForm.email;
      this.address = [
        savedForm.street + ' ' + savedForm.house,
        savedForm.postcode,
        savedForm.city,
        'Россия',
      ].join(', ');
    }
    if (localStorage.getItem('delivery')) {
      this.deliveryMethod = localStorage.getItem('delivery') as any;
    } else {
      localStorage.setItem('delivery', this.deliveryMethod);
    }
  }

  public ngOnDestroy() {
    localStorage.setItem('delivery', this.deliveryMethod);
  }

  public changeDelivery(value: 'courier' | 'self'): void {
    this.deliveryMethod = value;
    localStorage.setItem('delivery', this.deliveryMethod);
  }
}
