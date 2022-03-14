import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumenesComponent } from './volumenes.component';

describe('VolumenesComponent', () => {
  let component: VolumenesComponent;
  let fixture: ComponentFixture<VolumenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolumenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
