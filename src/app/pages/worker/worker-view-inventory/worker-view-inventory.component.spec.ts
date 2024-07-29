import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerViewInventoryComponent } from './worker-view-inventory.component';

describe('WorkerViewInventoryComponent', () => {
  let component: WorkerViewInventoryComponent;
  let fixture: ComponentFixture<WorkerViewInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerViewInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerViewInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
