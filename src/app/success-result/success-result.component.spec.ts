import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessResultComponent } from './success-result.component';

describe('SuccessResultComponent', () => {
  let component: SuccessResultComponent;
  let fixture: ComponentFixture<SuccessResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
