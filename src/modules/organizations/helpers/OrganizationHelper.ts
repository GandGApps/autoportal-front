import {PersonalOrganizations} from './../models/PersonalOrganizations';
import {UnitsFilter} from './../types/OrganizationTypes';
import {FilterFormKeys} from '../form/FilterForm';
import {CreatetFormModel} from '../form/CreateForm';
import {CurrentOrganization} from '../models/CurrentOrganization';

interface FormattedPersonal {
  activeList: PersonalOrganizations[];
  disabledList: PersonalOrganizations[];
}

export class OrganizationHelper {
  static getModalTitle = (typeModal: FilterFormKeys) => {
    switch (typeModal) {
      case 'category':
        return 'Выберите категорию';
      case 'typeService':
        return 'Выберите услуги';
      case 'brandCar':
        return 'Выберите марки машин';
      case 'sort':
        return 'Выберите сортировку';
      case 'schedule':
        return 'Выберите график работы';
      default:
        return '';
    }
  };

  static getSubsCheckedList = (_list: string[], _subs: UnitsFilter[]) => {
    const tempPickList: string[] = _subs.map(subItem => subItem._id);

    if (_list.join().includes(tempPickList.join())) {
      return [..._list.filter(item => !tempPickList.includes(item))];
    }

    return [..._list, ...tempPickList];
  };

  static checkCategorySub = (
    _list: string[],
    _subs: UnitsFilter[],
  ): boolean => {
    const tempSubs = _subs.map(item => item._id);

    return (
      _list.filter(item => tempSubs.includes(item)).length === tempSubs.length
    );
  };

  static formattedMyOrganizations = (
    list: PersonalOrganizations[],
  ): FormattedPersonal => {
    return {
      activeList: list.filter(item => item.isActive),
      disabledList: list.filter(item => !item.isActive),
    };
  };

  static getDefaultCreateForm = (
    organization: CurrentOrganization,
  ): CreatetFormModel => {
    return {
      name: organization.name,
      city: organization.city,
      category: organization.category,
      typeService: [],
      brandCar: [],
      schedule: organization.schedule,
      address: organization.address,
      mainPhone: organization.contactInfo?.mainPhone || '',
      whatsApp: organization.contactInfo?.whatsApp || '',
      employeers: [],
      description: organization.description,
      logo: organization.logo
        ? {
            type: 'image/jpg',
            name: 'defaultName',
            uri: organization.logo,
          }
        : null,
      photos: organization.previews.map(item => {
        return {
          type: 'image/jpg',
          name: 'defaultName',
          uri: item,
        };
      }),
    };
  };
}
