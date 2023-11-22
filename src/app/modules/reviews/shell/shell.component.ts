import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html'
})
export class ShellComponent{
  constructor() {
    const script:Element | null = document.querySelector('script[src="assets/main.js"]');
    if (script){
      document.body.removeChild(script)
    }
    setTimeout(()=>{
      const script = document.createElement('script');
      script.src = 'assets/main.js';
      document.body.appendChild(script)
    }, 1000)
  }
}
