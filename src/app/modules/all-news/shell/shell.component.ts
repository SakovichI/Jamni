import {Component, OnInit} from "@angular/core";
import {ApiNewsService} from "../../../core";

@Component({
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit{
  public news: any[] = [];
  constructor(private apiNewsService: ApiNewsService) {
    this.apiNewsService.listNews().subscribe((news: any) => {
      this.news = [news[0],news[0],news[0],news[0],news[0],news[0],news[0],news[0]];
    })
  }
  ngOnInit() {
    }
}
