import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class File extends AbstractModel {
  _id: string = '';
  url: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
