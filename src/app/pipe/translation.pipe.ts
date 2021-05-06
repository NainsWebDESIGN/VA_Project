import { Pipe, PipeTransform } from '@angular/core';
import { Translate } from '@ts/translation';

@Pipe({
  name: 'Translation'
})
export class TranslationPipe implements PipeTransform {
  constructor() { }
  transform(value: string, lang: string) {
    const basis = Translate[lang];
    return basis[value] || value;
  }

}
