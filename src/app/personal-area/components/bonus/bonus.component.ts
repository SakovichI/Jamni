import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit, AfterViewInit {
  balance:number = 800000
  posY: number = 0
  posX: number = 0
  @ViewChild('tooltip') tooltip?: ElementRef

  constructor() { }

  ngOnInit(): void {
    if(window.innerWidth > 520){
      if(this.balance === 0){
        this.posY = ((this.balance*100)/3000000)-12
        this.posX = ((this.balance*100)/3000000)-6
      }
      if(this.balance > 0 && this.balance < 500000){
        this.posY = ((this.balance*100)/3000000)-6
        this.posX = ((this.balance*100)/3000000)+3
      }
      if(this.balance >= 500000 && this.balance < 1500000){
        this.posY = ((this.balance*100)/3000000)-1
        this.posX = ((this.balance*100)/3000000)+9
      }
      if(this.balance >= 2000000 && this.balance < 3000000){
        this.posY = ((this.balance*100)/3000000)-15
        this.posX = ((this.balance*100)/3000000)-3
      }
      if(this.balance === 3000000){
        this.posY = ((this.balance*100)/3000000)-20
        this.posX = ((this.balance*100)/3000000)-8
      }
    }else{
      if(this.balance === 0){
        this.posY = ((this.balance*100)/3000000)-11
        this.posX = ((this.balance*100)/3000000)-10
      }
      if(this.balance > 0 && this.balance < 500000){
        this.posY = ((this.balance*100)/3000000)-5
        this.posX = ((this.balance*100)/3000000)-5
      }
      if(this.balance >= 500000 && this.balance < 1500000){
        this.posY = ((this.balance*100)/3000000)+3
        this.posX = ((this.balance*100)/3000000)+5
      }
      if(this.balance >= 2000000 && this.balance < 3000000){
        this.posY = ((this.balance*100)/3000000)-7
        this.posX = ((this.balance*100)/3000000)-7
      }
      if(this.balance === 3000000){
        this.posY = ((this.balance*100)/3000000)-11
        this.posX = ((this.balance*100)/3000000)-8
      }
    }

  }

  ngAfterViewInit() {
    if(this.balance >= 2350000){

      this.tooltip?.nativeElement.classList.add('left')

    }else{
      this.tooltip?.nativeElement.classList.remove('left')
    }
  }

  showTooltip(event: any){
    const tooltip = event.currentTarget.querySelector('.chart__main-dot-tooltip')
    event.currentTarget.classList.toggle('active')
    tooltip.classList.toggle('active')
  }
}
