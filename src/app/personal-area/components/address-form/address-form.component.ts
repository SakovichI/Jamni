import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  constructor() {
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

  ngOnInit(): void {
  }

}
