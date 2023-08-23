import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class Review extends AbstractModel {
  _id: string = '';
  fullName: string = '';
  rating: number = 0;
  date: string = '';
  comment: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
