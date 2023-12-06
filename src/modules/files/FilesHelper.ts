import ImageResizer from '@bam.tech/react-native-image-resizer';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

interface PickFileProps {
  limit: number;
  isLogo?: boolean;
  isPhoto?: boolean;
  isBanner?: boolean;
}

export class FileHelper {
  static async pickFile({limit, isLogo, isPhoto, isBanner}: PickFileProps) {
    const res = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: limit,
    });

    if (res.assets) {
      const photos: Asset[] = [];
      for (let index = 0; index < res.assets.length; index++) {
        const asset = res.assets[index];

        let width;
        let height;

        if (isLogo) {
          width = Math.min(asset.width!, 250);
          height = width;
        } else if (isPhoto) {
          const targetWidth = 500;
          const targetHeight = 250;

          const aspectRatio = asset.width! / asset.height!;

          if (aspectRatio >= targetWidth / targetHeight) {
            width = targetWidth;
            height = width / aspectRatio;
          } else {
            height = targetHeight;
            width = height * aspectRatio;
          }
        } else {
          width = 600;
          height = 240;
        }

        const response = await ImageResizer.createResizedImage(
          asset.uri ?? '',
          width,
          height,
          'JPEG',
          100,
          0,
          undefined,
          false,
          {
            mode: 'contain',
          },
        );

        photos.push({...asset, uri: response.uri});
      }

      return photos;
    }

    return false;
  }
}
