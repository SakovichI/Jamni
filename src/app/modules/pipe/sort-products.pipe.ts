import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortProducts'
})
export class SortProductsPipe implements PipeTransform {

  transform(category:any, search:any):any {

    if(search === 'цена: наименьшая'){
      let newArr:any=[];
      newArr =  category.sort((a:any, b:any) => {
        return a.price - b.price
      })
      return newArr
    }
    else if (search === 'цена: наибольшая'){
      let newArr:any=[];
      newArr =  category.sort((a:any, b:any) => {
        return b.price - a.price
      })
      return newArr
    }
    else{
      return category
    }

  }

}
