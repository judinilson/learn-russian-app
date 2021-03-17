import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContentTextsComponent } from './content-texts';

describe('ContentTextsComponent', () => {
  let component: ContentTextsComponent;
  let fixture: ComponentFixture<ContentTextsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTextsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
