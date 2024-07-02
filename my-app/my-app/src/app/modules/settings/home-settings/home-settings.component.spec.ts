import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSettingsComponent } from './home-settings.component';

describe('HomeSettingsComponent', () => {
  let component: HomeSettingsComponent;
  let fixture: ComponentFixture<HomeSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSettingsComponent]
    });
    fixture = TestBed.createComponent(HomeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
