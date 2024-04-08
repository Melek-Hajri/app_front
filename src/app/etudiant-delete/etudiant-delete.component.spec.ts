import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantDeleteComponent } from './etudiant-delete.component';

describe('EtudiantDeleteComponent', () => {
  let component: EtudiantDeleteComponent;
  let fixture: ComponentFixture<EtudiantDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtudiantDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
