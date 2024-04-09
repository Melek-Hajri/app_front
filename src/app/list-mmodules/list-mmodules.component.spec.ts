import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMModulesComponent } from './list-mmodules.component';

describe('ListMModulesComponent', () => {
  let component: ListMModulesComponent;
  let fixture: ComponentFixture<ListMModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMModulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
