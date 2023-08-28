import {format, parse, setHours, setMinutes} from 'date-fns';
import {ScheduleModel} from '../modules/organizations/types/OrganizationTypes';
import {ru} from 'date-fns/locale';

const ShortDaysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
export const DaysOfWeek = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const defaultSchedule = {
  title: 'Закрыто',
};

interface FormattedSchedule {
  day: string;
  time: string;
}

export class DateHelper {
  static buildScheduleText = (scheduleArray: ScheduleModel[]) => {
    const result: FormattedSchedule[] = ShortDaysOfWeek.map((day, index) => {
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

  static getFormatTime = (date: Date) => {
    return format(date, 'HH:mm', {locale: ru});
  };

  static getParseDate = (date: string) => {
    return parse(date, 'dd.MM.yyyy', new Date());
  };

  static getParseTime = (date: string) => {
    const [hours, minutes] = date.split(':').map(Number);

    const currentDate = new Date();

    return setHours(setMinutes(currentDate, minutes), hours);
  };

  static isStartMoreEnd = (dateStart: Date, dateEnd: string) => {
    return dateStart > parse(dateEnd, 'dd.MM.yyyy', new Date());
  };
}
