import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCategoryService, ApiOrderService } from '../../../core';
import { ApiFeedbackService } from '../../../core/api/api-feedback.service';

@Component({
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit, OnDestroy {
  @ViewChild('firstSliderNext') firstSliderNext?: ElementRef;
  public sliderItems: any[] = [];
  public bestsellers: any[] = [];
  public categories: any[] = [];
  public categoriesName: string = 'Каталог товаров';
  private firstInterval: undefined | ReturnType<typeof setInterval>;
  public form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private apiCategoryService: ApiCategoryService,
    private makeOrder: ApiOrderService,
    private makeFeedback: ApiFeedbackService,
    private route: Router
  ) {}

  public ngOnInit(): void {
    setTimeout(() => {
      const scriptOld: Element | null = document.querySelector(
        'script[src="assets/main.js"]'
      );
      if (scriptOld) {
        document.body.removeChild(scriptOld);
      }
      const script = document.createElement('script');
      script.src = 'assets/main.js';
      document.body.appendChild(script);
    }, 50);
    this.apiCategoryService.listCategories().subscribe(
      (categories) => {
        this.categories = categories;

        for (let i = 0; i < categories[0].childCategoryIds.length; ++i) {
          this.apiCategoryService
            .getCategory(categories[0].childCategoryIds[i])
            .subscribe((category) => {
              for (
                let i = 0;
                i <
                category.items.filter((el: any) => el.enabled === true).length;
                i++
              ) {
                if (category.items[i].id === 1086) {
                  continue;
                }
                this.sliderItems.push(
                  category.items.filter((el: any) => el.enabled === true)[i]
                );
              }
              this.cdr.detectChanges();
            });
        }

        this.apiCategoryService
          .getCategory(categories[1].id)
          .subscribe((category) => {
            for (
              let i = 0;
              i <
              category.items.filter((el: any) => el.enabled === true).length;
              i++
            ) {
              this.bestsellers.push(
                category.items.filter((el: any) => el.enabled === true)[i]
              );
            }
            this.cdr.detectChanges();
          });
      },
      (error) => {
        if (
          error.error.description ===
          'Invalid authorization token: Unexpected content JWS.'
        ) {
          this.route.navigate(['/']);
          localStorage.clear();
        }
      }
    );
  }

  public ngOnDestroy(): void {
    clearInterval(this.firstInterval);
  }

  submitForm(form: any) {
    const data = new FormData(form);
    const newData = new FormData();
    const obj = {
      request: {
        type: 'SUBSCRIBE',
        body: {
          email: data.get('email'),
        },
      },
    };
    const requestBlob = new Blob([JSON.stringify(obj.request)], {
      type: 'application/json',
    });
    newData.append('request', requestBlob, 'request');
    this.makeFeedback.makeFeedback(newData).subscribe((el) => {
      this.form.reset();
    });
  }

  hover(name: string) {
    this.categoriesName = name;
  }
}
