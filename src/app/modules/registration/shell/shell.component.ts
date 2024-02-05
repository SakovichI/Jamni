import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  private destroy$ = new Subject<void>()
  public formType:string = 'клиент'
  constructor() { }

  ngOnInit(): void {
  }

  changeForm(event: any){
    this.formType = event.target.value.toLowerCase()
  }
}
