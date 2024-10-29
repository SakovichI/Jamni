import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiFeedbackService } from '../../../core/api/api-feedback.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements AfterViewInit {
  public form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    phone: new FormControl(null, [
      Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    url: new FormControl(null, [
      Validators.pattern(
        /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[\w.-]*)*\/?$/i
      ),
    ]),
    message: new FormControl(null, [Validators.minLength(3)]),
  });

  constructor(
    private ApiMakeFeedback: ApiFeedbackService,
    private loader: LoaderService
  ) {}

  ngAfterViewInit(): void {
    this.loader.imgLoader();
  }

  submitForm(form: any) {
    const data = new FormData(form);
    const newData = new FormData();
    const obj = {
      request: {
        type: 'ACCESS_TO_3D_DATABASE',
        body: {
          name: data.get('name'),
          url: data.get('url'),
          phone: data.get('phone'),
          email: data.get('email'),
          message: data.get('message'),
        },
      },
    };
    const requestBlob = new Blob([JSON.stringify(obj.request)], {
      type: 'application/json',
    });
    newData.append('request', requestBlob, 'request');
    this.ApiMakeFeedback.makeFeedback(newData).subscribe((el) => {
      this.form.reset();
    });
  }
}
