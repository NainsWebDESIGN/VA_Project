import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'key'
})
export class KeyPipe implements PipeTransform {

  transform($obj: Array<any>) {
    let keys = Object.keys($obj[0]);
    let data = [];
    for (let i = 0; i < keys.length; i++) {
      data[i] = {};
      data[i].key = keys[i];
      data[i].value = [];
      for (let index = 0; index < $obj.length; index++) {
        data[i].value.push($obj[index][keys[i]]);
      }
    }
    // console.log(data);
    return data;
  }

}
