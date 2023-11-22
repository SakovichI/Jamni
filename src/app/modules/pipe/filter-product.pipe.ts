import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductPipe implements PipeTransform {

  transform(category:any, filterParams:any):any {
    let price = filterParams.filter((fg: any) => fg.controls.specification.value.valueType === 'NUMBER');
    if(price[0].value){
      let priceFrom = price[0].value.from;
      let priceTo = price[0].value.to;
      if(priceTo){
        return category.filter((el:any) =>{
          if(el.price >= priceFrom && el.price <= priceTo){
            return category
          }
        })
      }
    }

  }
}
