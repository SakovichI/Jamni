import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ApiCategoryService } from '../../../core';
import { filter } from 'rxjs';
import { GeneralService } from '../../../core/services/general.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit {
  public categories: any[] = [];
  public cat0: any;
  public cat1: any;

  constructor(
    private cdr: ChangeDetectorRef,
    public apiCategory: ApiCategoryService,
    public generalService: GeneralService,
    private loader: LoaderService
  ) {
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
    }, 1000);
  }
  ngOnInit() {
    this.loader.setLoader(true);
    this.apiCategory.listCategories().subscribe((category) => {
      this.categories = category.filter((el: any) => el.id !== 382);
      let cat0: object;
      let cat1: object;
      this.categories.forEach((category: any, i: number) => {
        if (i === 0) {
          cat0 = this.categories[0];
          cat1 = this.categories[1];
        }
        if (category.name.toLowerCase() === 'кровати') {
          this.categories[0] = this.categories[i];
          this.categories[i] = cat0;
        }
        if (category.name.toLowerCase() === 'диваны') {
          this.categories[1] = this.categories[i];
          this.categories[i] = cat1;
        }
      });
      this.loader.setLoader(false);
      this.cdr.detectChanges();
      this.loader.imgLoader();
    });
  }
}
