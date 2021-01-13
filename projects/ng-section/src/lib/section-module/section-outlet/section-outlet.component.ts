import { Component, Input, ViewContainerRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SectionRegistryService } from '../section-registry/section-registry.service';

@Component({
  selector: 'ng-section-outlet',
  template: '<ng-template *ngFor="let directive of directives$ | async" [ngTemplateOutlet]="directive.template"></ng-template>'
})
export class SectionOutletComponent {
  private hasKeyValue = false;
  private readonly _key$ = new ReplaySubject<string>(1);
  readonly directives$ = this._key$.pipe(
    switchMap(key => this._sectionRegistryService.retrieveSectionDirectives(key))
  );

  @Input() set key(key: string) {
    this._key$.next(key);
    this.hasKeyValue = true;
  }



  constructor(
    readonly viewContainerRef: ViewContainerRef,
    private readonly _sectionRegistryService: SectionRegistryService
  ) { }

  ngOnInit(): void {
    if (!this.hasKeyValue) throw new Error('The section outlet has a mandatory input parameter [key]. This is not provided.');
    this._sectionRegistryService.retrieveSectionDirectives(this.key);
  }
}
