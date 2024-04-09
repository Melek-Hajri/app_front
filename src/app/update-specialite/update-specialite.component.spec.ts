import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpecialiteComponent } from './update-specialite.component';

describe('UpdateSpecialiteComponent', () => {
  let component: UpdateSpecialiteComponent;
  let fixture: ComponentFixture<UpdateSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSpecialiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
