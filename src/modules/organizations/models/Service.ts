import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';

export class Service extends AbstractModel {
  '_id': string = '';
  'title': string = '';
  'categoryId': Nullable<string> = null;
  'is_extended': boolean = false;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
