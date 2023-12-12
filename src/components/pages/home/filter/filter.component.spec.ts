import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent]
    });
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not add any validations if all values are numeric', () => {
    const listOfValidations = [
      { id: 'input1', value: '123' },
      { id: 'input2', value: '456' },
    ];

    component.ValidateNumbers(listOfValidations);

    expect(document.getElementById('errormessages')?.innerHTML).toBeNaN;
  });

  it('should add validation for non-numeric value', () => {
    const listOfValidations = [
      { id: 'input1', value: '123' },
      { id: 'input2', value: 'abc' },
    ];

    component.ValidateNumbers(listOfValidations);

    const errorMessageElement = document.getElementById('errormessages');
    expect(errorMessageElement).not.toBeNull();
    expect(errorMessageElement?.innerHTML).toContain('input2 should only have numbers in it');
  });

  it('should not add any validations for empty values', () => {
    const listOfValidations = [
      { id: 'input1', value: '' },
      { id: 'input2', value: '' },
    ];
    

    component.ValidateNumbers(listOfValidations);

    expect(document.getElementById('errormessages')?.innerHTML).toBe('');
  });


  it('should add multiple validations for multiple non-numeric values', () => {
    const listOfValidations = [
      { id: 'input1', value: 'abc' },
      { id: 'input2', value: 'xyz' },
    ];

    component.ValidateNumbers(listOfValidations);

    const errorMessageElement = document.getElementById('errormessages');
    expect(errorMessageElement).not.toBeNull();
    expect(errorMessageElement?.innerHTML).toContain('input1 should only have numbers in it');
    expect(errorMessageElement?.innerHTML).toContain('input2 should only have numbers in it');
  });
  it('should not add any errors if min is lower than max', () => {
    const min = { id: 'input1', value: '10' };
    const max = { id: 'input2', value: '20' };

    component.ValidateMaxIsMoreThanMin(min, max);

    expect(document.getElementById('errormessages')?.innerHTML).toBe('');
  });

  it('should not add error if min is equal to max', () => {
    const min = { id: 'input1', value: '15' };
    const max = { id: 'input2', value: '15' };

    component.ValidateMaxIsMoreThanMin(min, max);

    const errorMessageElement = document.getElementById('errormessages');
    expect(errorMessageElement?.innerHTML).toBe('');
  });

  it('should add error if min is greater than max', () => {
    const min = { id: 'input1', value: '30' };
    const max = { id: 'input2', value: '20' };

    component.ValidateMaxIsMoreThanMin(min, max);

    const errorMessageElement = document.getElementById('errormessages');
    expect(errorMessageElement).not.toBeNull();
    expect(errorMessageElement?.innerHTML).toContain("input1's value can't be higher than input2's");
  });

  it('should not add errors if min and max are not valid numbers', () => {
    const min = { id: 'input1', value: 'abc' };
    const max = { id: 'input2', value: 'xyz' };

    component.ValidateMaxIsMoreThanMin(min, max);

    expect(document.getElementById('errormessages')?.innerHTML).toBe('');
  });
  it('should change transmission and trigger filterChanged', () => {
    spyOn(component, 'filterChanged');

    component.changeTransmission('automatic', ['any', 'manual']);

    expect(document.getElementById('automatic')?.hasAttribute('disabled')).toBe(true);
    expect(document.getElementById('any')?.hasAttribute('disabled')).toBe(false);
    expect(document.getElementById('manual')?.hasAttribute('disabled')).toBe(false);

    expect(component.filterChanged).toHaveBeenCalled();
  });

  it('should set transmission to any and trigger filterChanged', () => {
    spyOn(component, 'changeTransmission');
    
    component.setAny();

    expect(component.changeTransmission).toHaveBeenCalledWith('any', ['automatic', 'manual']);
  });

  it('should set transmission to automatic and trigger filterChanged', () => {
    spyOn(component, 'changeTransmission');
    
    component.setAuto();

    expect(component.changeTransmission).toHaveBeenCalledWith('automatic', ['any', 'manual']);
  });

  it('should set transmission to manual and trigger filterChanged', () => {
    spyOn(component, 'changeTransmission');
    
    component.setManual();

    expect(component.changeTransmission).toHaveBeenCalledWith('manual', ['automatic', 'any']);
  });
  it('should emit filter values for basic filter data', () => {
    const filterData = [{ id: 'someId', value: 'someValue' }];
    
    spyOn(component.filterTransfer, 'emit');

    component.sendFilterDataToHome(filterData);

    expect(component.filterTransfer.emit).toHaveBeenCalledWith([[filterData[0].id, filterData[0].value]]);
  });

  it('should emit filter values for empty filter data', () => {
    const filterData: { id: string, value: string }[] = [];

    spyOn(component.filterTransfer, 'emit');

    component.sendFilterDataToHome(filterData);

    expect(component.filterTransfer.emit).toHaveBeenCalledWith([]);
  });
  

  afterEach(() => {
    fixture.destroy();
  });

});


  
