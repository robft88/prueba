import { ActionCall } from './action-call.interface';
import { Exhibition } from './exhibition.interface';

export interface Profile {
  $key?: string;
  actionCall: ActionCall;
  exhibitions: Exhibition[];
  instagram: string;
  mailToHeader: string;
  name: string;
  photo: string;
  photoSize: string;
  photoSizeText: string;
  profession: string;
  user: string;
  webSide: string;
  webSideText: string;
}