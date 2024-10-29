import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { readFile } from 'fs';
import { ApiFeedbackService } from '../../../core/api/api-feedback.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements AfterViewInit {
  public file: File | undefined;
  public form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    phone: new FormControl(null, [
      Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    message: new FormControl(null, [Validators.minLength(3)]),
    file: new FormControl(null, [Validators.required]),
  });
  public form1: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    phone: new FormControl(null, [
      Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    message: new FormControl(null, [Validators.minLength(3)]),
  });

  constructor(
    private apiFeedback: ApiFeedbackService,
    private loader: LoaderService
  ) {}
  ngAfterViewInit(): void {
    this.loader.imgLoader();
  }

  formSubmit(form: any) {
    this.loader.setLoader(true);
    const data = new FormData(form);
    if (data.get('file')) {
      const newData = new FormData();
      const obj = {
        request: {
          type: 'SEND_3D_MODEL',
          body: {
            name: data.get('name'),
            phone: data.get('phone'),
            email: data.get('email'),
            message: data.get('message'),
          },
        },
        file: data.get('file'),
      };
      const requestBlob = new Blob([JSON.stringify(obj.request)], {
        type: 'application/json',
      });
      newData.append('request', requestBlob, 'request');
      // @ts-ignore
      newData.append('file', obj.file, 'file');
      this.apiFeedback.makeFeedback(newData).subscribe(() => {
        // @ts-ignore
        this.file = null;
        form.reset();
        this.loader.setLoader(false);
      });
    } else {
      const newData = new FormData();
      const obj = {
        request: {
          type: 'ACCESS_TO_3D_DATABASE',
          body: {
            name: data.get('name'),
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
      // @ts-ignore
      newData.append('file', obj.file, 'file');
      this.apiFeedback.makeFeedback(newData).subscribe(() => {
        // @ts-ignore
        this.file = null;
        form.reset();
        this.loader.setLoader(false);
      });
    }
  }
  getFile(file: any) {
    this.file = file[0];
  }
}
