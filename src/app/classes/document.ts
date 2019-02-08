import * as moment from 'moment';

export class Document {
  public id = null;
  public name = '';
  public text = '';
  public date = null;
  public type = 'document';
  public category = null;
  public categoryId = null;
  public categoryName = '';

  constructor(obj) {
    this.id = obj ? moment().format('x') : null;
    this.name = obj ? obj.name : '';
    this.text = obj ? obj.text : '';
    this.date = obj ? moment().format('YYYYMMDDHHmm') : null;
    this.type = 'document';
    this.category = obj ? obj.category : '';
    this.categoryId = obj ? obj.categoryId : null;
    this.categoryName = '';
  }

}
