import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreruteoComponent } from './preruteo.component';

describe('PreruteoComponent', () => {
  let component: PreruteoComponent;
  let fixture: ComponentFixture<PreruteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreruteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreruteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
