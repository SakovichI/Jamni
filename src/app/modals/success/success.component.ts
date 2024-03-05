import { Component, OnInit } from '@angular/core';
import { ModalsService } from 'src/app/core/services/modals.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  constructor(public modal: ModalsService) {}

  ngOnInit() {}
}
