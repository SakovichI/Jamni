import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css'],
  providers: [NgModel],
})
export class BonusComponent implements OnInit, AfterViewInit {
  balance: number = 800000;
  percentBonus: number = 0;
  public form: FormGroup = new FormGroup({
    value: new FormControl(''),
  });
  @ViewChild('line') line?: any;
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.line) {
      const dotWrap: HTMLElement = this.line.sliderHandle.nativeElement;
      const tooltip = `<div class="chart__main-dot-tooltip">
      <span class="chart__main-dot-text" >Сумма: ${this.balance + ' $'}</span>
      <span class="chart__main-dot-text percentBonus">Вознаграждение: ${
        this.percentBonus + ' %'
      }</span>
    </div>`;
      dotWrap.insertAdjacentHTML('afterbegin', tooltip);
      this.updateValue();
    }
  }

  showTooltip(event: any) {
    const tooltip = event.currentTarget.querySelector(
      '.chart__main-dot-tooltip'
    );
    event.currentTarget.classList.toggle('active');
    tooltip.classList.toggle('active');
  }
  valueSet(event: any) {
    this.balance = event.value;
    this.updateValue();
  }
  updateValue() {
    const tooltip = document.querySelector('.chart__main-dot-tooltip');
    const value = tooltip?.querySelector('.chart__main-dot-text');
    const percentBonus = tooltip?.querySelector('.percentBonus');
    if (value && percentBonus) {
      value.textContent = `Сумма:${this.balance} $`;
      if (this.balance >= 500000 && this.balance < 1500000) {
        this.percentBonus = 10;
      } else if (this.balance >= 1500000 && this.balance < 3000000) {
        this.percentBonus = 15;
      } else if (this.balance === 3000000) {
        this.percentBonus = 20;
      } else if (this.balance >= 0 && this.balance < 500000) {
        this.percentBonus = 0;
      }
      if (this.balance >= 2000000) {
        tooltip?.classList.add('left');
      } else {
        tooltip?.classList.remove('left');
      }
      if (this.balance <= 500000 && window.innerWidth < 500) {
        tooltip?.classList.add('right');
      } else {
        tooltip?.classList.remove('right');
      }
      percentBonus.textContent = `Вознаграждение:${this.percentBonus} %`;
    }
  }
  resetTooltip(event: any) {
    if (event.type === 'click') {
      const wrap = document.querySelector('.chart__main');
      document.addEventListener('click', (e: any) => {
        const target = e.target;
        if (wrap) {
          if (!wrap?.contains(target) && wrap !== target) {
            this.balance = 800000;
            this.updateValue();
          }
        }
      });
    } else {
      this.balance = 800000;
      this.updateValue();
    }
  }
}
