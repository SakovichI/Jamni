import {Component, OnInit} from "@angular/core";
import {ApiItemService} from "../../../core";
import {GeneralService} from "../../../core/services/general.service";

@Component({
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit{
  public items: any = [];
  constructor(private apiItemsService: ApiItemService,
              public generalService: GeneralService) {
    this.apiItemsService.listItems().subscribe((items: any) => {
      this.items = items;
    })
  }
  public ngOnInit() {
    setTimeout(()=>{
      const scripts:Element | null = document.querySelector('script[src="assets/main.js"]');
      if (scripts){
        document.body.removeChild(scripts)
      }
      const script = document.createElement('script');
      script.src = 'assets/main.js';
      document.body.appendChild(script)
    }, 500)
  }
}
