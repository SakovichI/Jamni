import { Injectable } from '@angular/core';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public loaded = false;

  setLoader(loading = false) {
    this.loaded = loading;
  }

  imgLoader() {
    let imgs = document.querySelectorAll('img');
    imgs.forEach((item) => {
      if (Array.from(imgs).find((el) => el.complete === false)) {
        this.setLoader(true);
      } else {
        this.setLoader(false);
      }
      item.onload = (e) => {
        if (Array.from(imgs).find((el) => el.complete === false)) {
          this.setLoader(true);
        } else {
          this.setLoader(false);
        }
      };
    });
  }
}
