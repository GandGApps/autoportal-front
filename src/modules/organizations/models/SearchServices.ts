import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';
import {Category} from './Category';

export class SearchServices extends AbstractModel {
  _id: string = '';
  title: string = '';
  category: Nullable<Category> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
