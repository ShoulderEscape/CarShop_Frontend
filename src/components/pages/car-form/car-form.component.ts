import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/ArticleService';
import { Car } from 'src/app/models/car.model';
import { ImageService } from 'src/app/services/ImageService';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css'],
})
export class CarFormComponent implements OnInit {
  carForm: FormGroup;
  selectedFiles: File[] = [];


  constructor(private formBuilder: FormBuilder, private createArticleService: ArticleService, private imageService: ImageService) {
    this.carForm = this.formBuilder.group({});
  }
  

  ngOnInit() {
    this.carForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      mileAge: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fuelType: ['', Validators.required],
      transmission: ['', Validators.required],
      contactName: ['', Validators.required],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description: [''],
      imagelink: []
    });
  }

  onFilesSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as ArrayBuffer;
        this.carForm.patchValue({ imagelink: result }); 
      };
      reader.readAsArrayBuffer(file);
    }
  }
  


  onSubmit() {
    if (this.carForm.valid) {
      const carData: Car = this.carForm.value as Car;
      const carDTO: any = carData;
      console.log(carData.imagelink instanceof Uint8Array);
      if(carDTO.imagelink){
        carDTO.imagelink=this.imageService.convertByteArrayToBase64(<Uint8Array>carData.imagelink);

      }
      console.log('Car Data:', carData);

      // Skapar FormData för att inkludera filer
      
      this.createArticleService.CreateArticle(carDTO).subscribe(
        response => {
          console.log('Success:', response);
        },
        error => {
          console.error('Error:', error);
        }
    );
        
          

    }
  }
}
