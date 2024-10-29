import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiItemService } from '../../../core';
import { GeneralService } from '../../../core/services/general.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit {
  public items: any = [];
  constructor(
    private apiItemsService: ApiItemService,
    public generalService: GeneralService,
    public router: Router,
    public loader: LoaderService
  ) {
    this.apiItemsService.listItems().subscribe((items: any) => {
      this.loader.setLoader(false);
      this.items = items;
    });
  }
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
  }
}
