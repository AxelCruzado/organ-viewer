import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganDetailsComponent } from './organ-details.component';

describe('OrganDetailsComponent', () => {
  let component: OrganDetailsComponent;
  let fixture: ComponentFixture<OrganDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
