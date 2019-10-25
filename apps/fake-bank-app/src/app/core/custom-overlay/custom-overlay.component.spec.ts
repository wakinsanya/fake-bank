import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOverlayComponent } from './custom-overlay.component';

describe('CustomOverlayComponent', () => {
  let component: CustomOverlayComponent;
  let fixture: ComponentFixture<CustomOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
