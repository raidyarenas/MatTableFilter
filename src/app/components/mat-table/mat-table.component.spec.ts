import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableComponent } from './mat-table.component';

describe('MatTableComponent', () => {
  let component: MatTableComponent;
  let fixture: ComponentFixture<MatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'MatTableFilter'`, () => {
    fixture = TestBed.createComponent(MatTableComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MatTableFilter app is running!');
  });

  it('should render title', () => {
    fixture = TestBed.createComponent(MatTableComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div.content span').textContent).toContain('MatTableFilter app is running!');
  });

});
