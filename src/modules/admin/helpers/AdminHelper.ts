import {CreateBannerDTO} from '../types/AdminTypes';

export class AdminHelper {
  static isBannerValid = (dto: Omit<CreateBannerDTO, 'image'>) => {
    return dto.title.length > 0 && dto.organisation_id.length > 0;
  };
}
