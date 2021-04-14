import { Pipe, PipeTransform } from '@angular/core';
import { Translate } from '@ts/translation';

@Pipe({
  name: 'Translation'
})
export class TranslationPipe implements PipeTransform {

  transform(value: string, type: string) {
    const basis = Translate[type];
    return basis[value] || value;
  }

}
