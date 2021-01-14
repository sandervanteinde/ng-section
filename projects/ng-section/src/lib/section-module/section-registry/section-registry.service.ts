import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SectionDirective } from '../section/section.directive';

@Injectable({
  providedIn: 'root'
})
export class SectionRegistryService {
  private readonly _registry$ = new BehaviorSubject<Map<string, SectionDirective[]>>(new Map());

  registerDirective(key: string, directive: SectionDirective): void {
    const currentMap = this._registry$.value;
    const newMap = new Map(currentMap);
    const sectionDirectives = newMap.get(key);

    if (!sectionDirectives) {
      newMap.set(key, [directive]);
    } else {
      const copyOfExisting = [...sectionDirectives];
      copyOfExisting.push(directive);
      copyOfExisting.sort((left, right) => !left.order ? 1 : (!right.order ? -1 : left.order - right.order));
      newMap.set(key, copyOfExisting);
    }

    this._registry$.next(newMap);
  }

  unregisterDirective(key: string, directive: SectionDirective): void {
    const map = this._registry$.value.get(key);
    if(!map) return;
    const newMap = new Map(this._registry$.value);
    const newArray = map.filter(f => f !== directive);
    if(newArray.length === 0) {
      newMap.delete(key);
    } else {
      newMap.set(key, newArray);
    }

    this._registry$.next(newMap);
  }

  retrieveSectionDirectives(key: string): Observable<SectionDirective[]> {
    return this._registry$.pipe(
      map(registry => {
        const directives = registry.get(key);
        if(!directives) return [];
        return directives;
      }),
      distinctUntilChanged()
    )
  }
}
