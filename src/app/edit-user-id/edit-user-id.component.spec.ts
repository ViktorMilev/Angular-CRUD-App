import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserIDComponent } from './edit-user-id.component';

describe('EditUserIDComponent', () => {
  let component: EditUserIDComponent;
  let fixture: ComponentFixture<EditUserIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserIDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
