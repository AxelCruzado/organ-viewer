import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganosComponent } from './admin-organos.component';

describe('AdminOrganosComponent', () => {
  let component: AdminOrganosComponent;
  let fixture: ComponentFixture<AdminOrganosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrganosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrganosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
