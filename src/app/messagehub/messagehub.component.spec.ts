import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagehubComponent } from './messagehub.component';

describe('MessagehubComponent', () => {
  let component: MessagehubComponent;
  let fixture: ComponentFixture<MessagehubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagehubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagehubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
