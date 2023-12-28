import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class Category extends AbstractModel {
  _id: string = '';
  title: string = '';
  noBrands?: boolean = false;
  noService?: boolean = false;

  img?: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
