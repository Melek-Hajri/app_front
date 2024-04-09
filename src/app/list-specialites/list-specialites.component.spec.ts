import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpecialitesComponent } from './list-specialites.component';

describe('ListSpecialitesComponent', () => {
  let component: ListSpecialitesComponent;
  let fixture: ComponentFixture<ListSpecialitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSpecialitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSpecialitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
