import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganoDetailComponent } from './organo-detail.component';

describe('OrganoDetailComponent', () => {
  let component: OrganoDetailComponent;
  let fixture: ComponentFixture<OrganoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
