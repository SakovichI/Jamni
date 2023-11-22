import {ChangeDetectionStrategy, Component} from "@angular/core";
import {GeneralService} from "../../../core/services/general.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html'
})
export class ShellComponent{
  constructor(public generalService: GeneralService) {
  }

  public onAddToCartClick(): void {
    this.generalService.cart?.nativeElement.click();
  }
}
