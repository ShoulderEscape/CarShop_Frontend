// image.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This ensures that the service is provided at the root level
})
export class ImageService {

  constructor() { }

  convertByteArrayToBase64(byteArray: Uint8Array): string {
    const binaryString = byteArray.reduce((acc, byte) => {
      return acc + String.fromCharCode(byte);
    }, '');
    return btoa(binaryString);
    }
}
