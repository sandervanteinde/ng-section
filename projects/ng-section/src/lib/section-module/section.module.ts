import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionOutletComponent } from './section-outlet/section-outlet.component';
import { SectionDirective } from './section/section.directive';



@NgModule({
  declarations: [SectionOutletComponent, SectionDirective],
  imports: [ CommonModule ],
  exports: [ SectionOutletComponent, SectionDirective ]
})
export class NgSectionModule { }
