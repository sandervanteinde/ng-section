import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOutletComponent } from './section-outlet.component';

describe('SectionOutletComponent', () => {
  let component: SectionOutletComponent;
  let fixture: ComponentFixture<SectionOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
