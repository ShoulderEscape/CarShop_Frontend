import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css'],
})
export class CarFormComponent implements OnInit {
  carForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.carForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.carForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      mileage: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fuelType: ['', Validators.required],
      transmission: ['', Validators.required],
      contactName: ['', Validators.required],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description: [''],
    });
  }

  onFilesSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      // Begränser antalet filer till max 10
      for (
        let i = 0;
        i < fileList.length && this.selectedFiles.length < 10;
        i++
      ) {
        this.selectedFiles.push(fileList[i]);
      }
    }
  }

  onSubmit() {
    if (this.carForm.valid) {
      const carData: Car = this.carForm.value as Car;
      console.log('Car Data:', carData);

      // Skapar FormData för att inkludera filer
      const formData = new FormData();
      this.selectedFiles.forEach((file, index) => {
        formData.append(`carImages[${index}]`, file, file.name);
      });

      // Lägger till carData i formData
      for (const key in carData) {
        if (carData.hasOwnProperty(key)) {
          const value = carData[key as keyof Car];
          formData.append(key, value);
        }
      }
      // Skicka formData till server här
    }
  }
}
