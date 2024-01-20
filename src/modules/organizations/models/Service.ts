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


export class GetService extends AbstractModel {
  '_id': string = '';
  'title': string = '';
  'category_id': Nullable<object> = null;
  'is_extended': boolean = false;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
