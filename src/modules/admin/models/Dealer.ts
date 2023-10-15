import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {DealerInfo} from '../types/AdminTypes';

export class Dealer extends AbstractModel {
  dealer: DealerInfo = {
    subscription_until: null,
    free_period: true,
    period_updated: false,
    _id: '',
    phone_number: '',
    code: '',
    subscription_status: false,
    is_banned: false,
    city: '',
    full_name: '',
  };
  organisation_count: number = 0;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
