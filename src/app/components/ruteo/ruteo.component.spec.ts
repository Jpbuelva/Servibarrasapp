import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuteoComponent } from './ruteo.component';

describe('RuteoComponent', () => {
  let component: RuteoComponent;
  let fixture: ComponentFixture<RuteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
