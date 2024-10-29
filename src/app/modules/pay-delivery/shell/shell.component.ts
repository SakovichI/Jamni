import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit, AfterViewInit {
  constructor(private loader: LoaderService) {}

  ngOnInit(): void {
    this.loader.setLoader(true);
  }

  ngAfterViewInit(): void {
    this.loader.setLoader(false);
    this.loader.imgLoader();
  }
}
