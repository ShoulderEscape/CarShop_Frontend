import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
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
