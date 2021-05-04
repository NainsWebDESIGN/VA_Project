import { Pipe, PipeTransform } from '@angular/core';
import { Translate } from '@ts/translation';
import { Information } from '@service/information.service';

@Pipe({
  name: 'Translation'
})
export class TranslationPipe implements PipeTransform {
  constructor(private infor: Information) { }
  transform(value: string) {
    const basis = Translate[this.infor.lang];
    return basis[value] || value;
  }

}
