import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class Message extends AbstractModel {
  message: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
