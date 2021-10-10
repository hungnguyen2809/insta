import { TakePictureOptions, TakePictureResponse } from 'react-native-camera';

export interface TakePhotoScreenParam {
  option: TakePictureOptions | undefined;
}

export interface HomeScreenParam {
  photo: TakePictureResponse | undefined;
}
