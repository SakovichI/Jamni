import { AfterViewInit, Component, OnInit } from '@angular/core';
// import {ApiNewsService} from "../../../core";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class ShellComponent implements OnInit, AfterViewInit {
  constructor(private loader: LoaderService) {}
  // public news: any;
  // constructor(private apiNewsService: ApiNewsService, private ar: ActivatedRoute) {
  //   this.ar.paramMap.subscribe((paramMap: ParamMap) => {
  //     const id = parseInt(paramMap.get('id') as string,10);
  //     this.apiNewsService.getNews(id).subscribe((news: any) => {
  //       this.news = news;
  //     })
  //   })
  // }
  ngOnInit() {
    this.loader.setLoader(true);
  }

  ngAfterViewInit(): void {
    this.loader.setLoader(false);
    this.loader.imgLoader();
  }
}
