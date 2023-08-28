import {format, parse} from 'date-fns';
import {ScheduleModel} from '../modules/organizations/types/OrganizationTypes';

const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

const defaultSchedule = {
  title: 'Закрыто',
};

interface FormattedSchedule {
  day: string;
  time: string;
}

export class DateHelper {
  static buildScheduleText = (scheduleArray: ScheduleModel[]) => {
    const result: FormattedSchedule[] = daysOfWeek.map((day, index) => {
      const item = scheduleArray[index] || defaultSchedule;
      let time = 'закрыто';

      if (item.isAllDay) {
        time = 'круглосуточно';
      } else if (item.to && item.do) {
        time = `${item.to} - ${item.do}`;
      }

      return {day, time};
    });

    return result;
  };

  static getToday = () => {
    return format(new Date(), 'dd.MM.yyyy');
  };

  static getFormatDate = (date: Date) => {
    return format(date, 'dd.MM.yyyy');
  };

  static getParseDate = (date: string) => {
    return parse(date, 'dd.MM.yyyy', new Date());
  };

  static isStartMoreEnd = (dateStart: Date, dateEnd: string) => {
    return dateStart > parse(dateEnd, 'dd.MM.yyyy', new Date());
  };
}
