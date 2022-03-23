import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraDemografiasComponent } from './barra-demografias.component';

describe('BarraDemografiasComponent', () => {
  let component: BarraDemografiasComponent;
  let fixture: ComponentFixture<BarraDemografiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraDemografiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraDemografiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
