import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableDemoComponent } from './observable-demo.component';

describe('ObservableDemoComponent', () => {
  let component: ObservableDemoComponent;
  let fixture: ComponentFixture<ObservableDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObservableDemoComponent]
    });
    fixture = TestBed.createComponent(ObservableDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
