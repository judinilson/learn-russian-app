import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContentDemoComponent } from './content-demo';

describe('ContentDemoComponent', () => {
  let component: ContentDemoComponent;
  let fixture: ComponentFixture<ContentDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
