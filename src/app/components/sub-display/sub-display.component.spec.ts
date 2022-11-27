import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDisplayComponent } from './sub-display.component';

describe('SubDisplayComponent', () => {
  let component: SubDisplayComponent;
  let fixture: ComponentFixture<SubDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
