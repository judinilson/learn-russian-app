import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoDemoComponent } from './video-demo.component';

describe('VideoDemoComponent', () => {
  let component: VideoDemoComponent;
  let fixture: ComponentFixture<VideoDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
