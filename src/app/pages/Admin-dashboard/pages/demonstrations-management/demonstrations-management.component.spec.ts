import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstrationsManagementComponent } from './demonstrations-management.component';

describe('DemonstrationsManagementComponent', () => {
  let component: DemonstrationsManagementComponent;
  let fixture: ComponentFixture<DemonstrationsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemonstrationsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemonstrationsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
