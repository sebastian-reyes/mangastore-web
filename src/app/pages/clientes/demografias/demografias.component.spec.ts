import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemografiasComponent } from './demografias.component';

describe('DemografiasComponent', () => {
  let component: DemografiasComponent;
  let fixture: ComponentFixture<DemografiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemografiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemografiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
