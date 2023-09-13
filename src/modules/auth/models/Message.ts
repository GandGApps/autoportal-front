import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';
import {UserInfo} from '../../user/models/UserInfo';

export class Message extends AbstractModel {
  message: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
