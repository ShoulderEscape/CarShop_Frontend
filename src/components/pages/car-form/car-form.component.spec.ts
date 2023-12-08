import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFormComponent } from './car-form.component';
import { ReactiveFormsModule} from '@angular/forms';


describe('CarFormComponent', () => {
  let component: CarFormComponent;
  let fixture: ComponentFixture<CarFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarFormComponent],
      imports: [ReactiveFormsModule],

    });
    fixture = TestBed.createComponent(CarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should add files to selectedFiles array when files are selected', () => {
    const mockEvent = {
      currentTarget: {
        files: [
          new File(['file1'], 'file1.txt'),
          new File(['file2'], 'file2.txt'),
        ],
      },
    } as unknown as Event;

    component.onFilesSelected(mockEvent);

    expect(component.selectedFiles.length).toBe(2);
    expect(component.selectedFiles[0].name).toBe('file1.txt');
    expect(component.selectedFiles[1].name).toBe('file2.txt');
  });

  it('should limit the number of selected files to a maximum of 10', () => {
    const mockEvent = {
      currentTarget: {
        files: Array.from({ length: 15 }, (_, i) => new File([`file${i + 1}`], `file${i + 1}.txt`)),
      },
    } as unknown as Event;

    component.onFilesSelected(mockEvent);

    expect(component.selectedFiles.length).toBe(10);
  });

  it('should not add files if no files are selected', () => {
    const mockEvent = {
      currentTarget: {
        files: null,
      },
    } as unknown as Event;

    component.onFilesSelected(mockEvent);

    expect(component.selectedFiles.length).toBe(0);
  });
 

  it('should not submit car data when the form is not valid', () => {
    component.carForm.setErrors({});

    spyOn(console, 'log');

    component.onSubmit();

    expect(console.log).not.toHaveBeenCalled();
  });

  

  
});
