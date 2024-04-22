import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefDepartementDashboardComponent } from './chef-departement-dashboard.component';

describe('ChefDepartementDashboardComponent', () => {
  let component: ChefDepartementDashboardComponent;
  let fixture: ComponentFixture<ChefDepartementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChefDepartementDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChefDepartementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
