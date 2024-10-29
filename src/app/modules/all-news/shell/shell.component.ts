import { Component, OnInit } from '@angular/core';
import { ApiNewsService } from '../../../core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class ShellComponent implements OnInit {
  public news: any[] = [];
  constructor(
    private apiNewsService: ApiNewsService,
    private loader: LoaderService
  ) {
    this.loader.setLoader(true);
    this.apiNewsService.listNews().subscribe((news: any) => {
      this.news = [
        news[0],
        news[0],
        news[0],
        news[0],
        news[0],
        news[0],
        news[0],
        news[0],
      ];
      this.loader.setLoader(false);
    });
  }
  ngOnInit() {
    this.loader.imgLoader();
  }
}
