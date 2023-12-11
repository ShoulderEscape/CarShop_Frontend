// image.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This ensures that the service is provided at the root level
})
export class ImageService {

  constructor() { }

  convertByteArrayToBase64(byteArray: Uint8Array): string {
    console.log(byteArray instanceof Uint8Array);
    const binary = btoa(String.fromCharCode(...byteArray));

    console.log(binary);
    return btoa(binary);
  }
}
