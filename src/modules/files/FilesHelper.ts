import ImageResizer from '@bam.tech/react-native-image-resizer';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

interface PickFileProps {
  limit: number;
  isLogo?: boolean;
  isPhoto?: boolean;
  isBanner?: boolean;
}

export class FileHelper {
  static async pickFile({limit, isLogo, isPhoto, isBanner}: PickFileProps) {
    const pickerOptions = {
      mediaType: 'photo',
      selectionLimit: limit,
    };

    if (isLogo) {
      const logoImage = await ImagePicker.openPicker({
        ...pickerOptions,
        cropping: true,
        width: 250,
        height: 250,
        cropperToolbarTitle: 'Редактирование',
        freeStyleCropEnabled: true,
        cropperCircleOverlay: true,
      });

      return [{uri: logoImage.path!, type: logoImage.mime}];
    }
    const res = await launchImageLibrary(pickerOptions);

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
          width = 500;
          height = 250;
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
