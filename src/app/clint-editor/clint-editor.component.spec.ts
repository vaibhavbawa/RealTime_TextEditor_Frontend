import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClintEditorComponent } from './clint-editor.component';

describe('ClintEditorComponent', () => {
  let component: ClintEditorComponent;
  let fixture: ComponentFixture<ClintEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClintEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClintEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
