// image.service.ts

import { Injectable } from '@nestjs/common';

import { Image } from 'image-js';

@Injectable()
export class ImageService {
  async findImagePosition(parentImagePath: string, childImagePath: string) {
    const data = await this.findSubImage(parentImagePath, childImagePath);
    return data;
  }

  async findSubImage(parentImagePath, subImagePath) {
    try {
      const parentImage = await Image.load(parentImagePath);
      const subImage = await Image.load(subImagePath);

      const parentData = parentImage.data;
      const subImageData = subImage.data;

      const parentWidth = parentImage.width;
      const parentHeight = parentImage.height;
      const subWidth = subImage.width;
      const subHeight = subImage.height;

      for (let y = 0; y < parentHeight - subHeight; y++) {
        for (let x = 0; x < parentWidth - subWidth; x++) {
          let match = true;

          for (let subY = 0; subY < subHeight; subY++) {
            for (let subX = 0; subX < subWidth; subX++) {
              const parentIdx = ((y + subY) * parentWidth + (x + subX)) * 4;
              const subIdx = (subY * subWidth + subX) * 4;

              for (let i = 0; i < 3; i++) {
                if (parentData[parentIdx + i] !== subImageData[subIdx + i]) {
                  match = false;
                  break;
                }
              }

              if (!match) break;
            }

            if (!match) break;
          }

          if (match) {
            const coordinates = {
              topLeft: { x, y },
              bottomRight: { x: x + subWidth, y: y + subHeight },
              center: { x: x + subWidth / 2, y: y + subHeight / 2 },
            };
            return coordinates;
          }
        }
      }

      console.log('Subimage not found in parent image.');
      return null;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
}
