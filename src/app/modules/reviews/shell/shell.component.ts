import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent {
  constructor(private loader: LoaderService) {
    this.loader.setLoader(true);
    const script: Element | null = document.querySelector(
      'script[src="assets/main.js"]'
    );
    if (script) {
      document.body.removeChild(script);
    }
    setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'assets/main.js';
      document.body.appendChild(script);
      this.loader.setLoader(false);
      this.loader.imgLoader();
    }, 1000);
  }
}
