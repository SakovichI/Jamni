import { Component, OnInit } from '@angular/core';
import { ModalsService } from 'src/app/core/services/modals.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor(public modal: ModalsService) {}

  ngOnInit() {}
}
