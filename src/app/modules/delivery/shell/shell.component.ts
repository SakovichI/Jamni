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
  ngAfterViewInit(): void {
    this.loader.imgLoader();
    this.loader.setLoader(false);
  }

  ngOnInit(): void {
    this.loader.setLoader(true);
  }
}
