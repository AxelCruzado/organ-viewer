import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganosComponent } from './organos.component';

describe('OrganosComponent', () => {
  let component: OrganosComponent;
  let fixture: ComponentFixture<OrganosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
