import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA], // This ignores unrecognized elements and attributes
      imports: [HttpClientModule], // Add HttpClientModule to imports
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle "visible" class on menu toggle click', fakeAsync(() => {
    const navbar = fixture.debugElement.query(By.css('.navbar')).nativeElement;
    expect(navbar.classList.contains('visible')).toBe(false);

    const menuToggle = fixture.debugElement.query(By.css('#mobile-menu')).nativeElement;
    menuToggle.click();
    tick();
    fixture.detectChanges();

    expect(navbar.classList.contains('visible')).toBe(true);

    menuToggle.click();
    tick();
    fixture.detectChanges();

    expect(navbar.classList.contains('visible')).toBe(false);
  }));

  afterEach(() => {
    fixture.destroy();
  });
});
