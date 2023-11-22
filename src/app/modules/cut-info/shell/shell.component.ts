import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../core/services/general.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit,OnDestroy {
  public form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    index: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    house: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)]),
  });
  constructor(public generalService: GeneralService) {
  }

  public ngOnInit(): void {
    setTimeout(()=>{
      const scripts:Element | null = document.querySelector('script[src="assets/main.js"]');
      if (scripts){
        document.body.removeChild(scripts)
      }
      const script = document.createElement('script');
      script.src = 'assets/main.js';
      document.body.appendChild(script)
    }, 500)
    if (localStorage.getItem('form')){
      const savedForm = JSON.parse(localStorage.getItem('form') as string);
      this.form.controls['email'].setValue(savedForm.email);
      this.form.controls['name'].setValue(savedForm.name);
      this.form.controls['surname'].setValue(savedForm.surname);
      this.form.controls['city'].setValue(savedForm.city);
      this.form.controls['index'].setValue(savedForm.index);
      this.form.controls['street'].setValue(savedForm.street);
      this.form.controls['house'].setValue(savedForm.house);
      this.form.controls['phone'].setValue(savedForm.phone);
    }
    // console.log(this.form)
    // this.form.markAsDirty();
    // this.form.markAsTouched();
    // this.form.markAsDirty();
  }

  public ngOnDestroy(): void {
    localStorage.setItem('form', JSON.stringify(this.form.value))
  }

  public onSaveFormToStorageClick(): void {
    localStorage.setItem('form', JSON.stringify(this.form.value))
  }
}
