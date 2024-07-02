import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentShowComponent } from './student-show.component';

describe('StudentShowComponent', () => {
  let component: StudentShowComponent;
  let fixture: ComponentFixture<StudentShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentShowComponent]
    });
    fixture = TestBed.createComponent(StudentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
