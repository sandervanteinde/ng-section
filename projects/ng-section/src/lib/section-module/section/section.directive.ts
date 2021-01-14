import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, TemplateRef } from '@angular/core';
import { SectionRegistryService } from '../section-registry/section-registry.service';

@Directive({
  selector: 'ng-template[ngSection]'
})
export class SectionDirective implements OnInit, OnChanges, OnDestroy {
  @Input('ngSection') sectionKey!: string;
  @Input('ngSectionOrder') order?: number;

  constructor(
    readonly template: TemplateRef<{}>,
    private readonly _sectionRegistry: SectionRegistryService
  ) { }

  ngOnInit(): void {
    if(!this.sectionKey) throw new Error('Invalid ngSection directive. Usage: *ngSection="\'keyOfSectionTobindTo\'"');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const key = changes.sectionKey;
    if(key) {
      if(key.previousValue) {
        this._sectionRegistry.unregisterDirective(key.previousValue, this);
      }
      if(key.currentValue) {
        this._sectionRegistry.registerDirective(key.currentValue, this);
      }
    }
  }

  ngOnDestroy(): void {
    this._sectionRegistry.unregisterDirective(this.sectionKey, this);
  }
}
