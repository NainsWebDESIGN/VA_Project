import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PIPE
import { TranslationPipe, KeyPipe } from '@pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TranslationPipe,
    KeyPipe
  ],
  exports: [
    TranslationPipe,
    KeyPipe
  ]
})
export class PipeModule { }
