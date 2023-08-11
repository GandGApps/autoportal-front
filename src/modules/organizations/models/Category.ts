import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';
import {File} from '../../files/models/File';

export class Category extends AbstractModel {
  _id: string = '';
  name: string = '';
  title: string = '';
  icon: Nullable<File> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
