import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapyWrapperComponent } from './swapy-wrapper.component';

describe('SwapyWrapperComponent', () => {
  let component: SwapyWrapperComponent;
  let fixture: ComponentFixture<SwapyWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapyWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapyWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
