import ImageResizer from '@bam.tech/react-native-image-resizer';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

interface PickFileProps {
  limit: number;
  isLogo?: boolean;
}

export class FileHelper {
  static async pickFile({limit, isLogo}: PickFileProps) {
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
          width = 150;
          height = 150;
        } else {
          width = Math.min(asset.width!, 400);
          height = Math.min(asset.height!, 250);
        }

        const response = await ImageResizer.createResizedImage(
          asset.uri ?? '',
          width,
          height,
          'JPEG',
          100,
        );

        photos.push({...asset, uri: response.uri});
      }

      return photos;
    }

    return false;
  }
}
