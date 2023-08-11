import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class File extends AbstractModel {
  url: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
