import * as moment from 'moment';

export class Category {
  public id = null;
  public name = '';
  public priority = 1;
  public date = null;
  public type = 'category';
  public icon = 'fa fa-file-o';
  public color = 'ffffff';

  constructor(obj) {
    this.id = obj ? moment().format('x') : null;
    this.name = obj ? obj.name : '';
    this.priority = obj ? parseInt(obj.priority, 10) : 1;
    this.date = obj ? moment().format('YYYYMMDDHHmm') : null;
    this.type = 'category';
    this.icon = obj ? obj.icon : 'fa fa-file-o';
    this.color = obj ? obj.color : 'ffffff';
  }

}
