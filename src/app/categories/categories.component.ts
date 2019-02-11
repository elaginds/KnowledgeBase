import { Component } from '@angular/core';
import { IoService } from '../service/io.service';
import { Category } from '../classes/category';

@Component({
  selector: 'app-categories-component',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  text_color = '#000000';
  search_icon = '';
  category = new Category(null);
  categories = [];

  constructor(private io: IoService) {
    this.getCategories();

    io.updateCategories$.subscribe( () => {
      this.getCategories();
    });
  }

  getCategories() {
    this.io.getCategories().then( (categories: any) => {
      categories.forEach(cat => {
        cat.invertColor = this.invertColor(cat.color);
      });

      this.categories = categories;
    });
  }

  onIconPickerSelect(newIcon) {
    this.category.icon = newIcon;
  }

  onAddCategory() {
    this.io.addCategory(this.category);
    this.category = new Category(null);
  }

  onChangeColor($event) {
    this.text_color = this.invertColor($event);
  }

  invertColor(hex) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    // invert color components
    const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + this.padZero(r, null) + this.padZero(g, null) + this.padZero(b, null);
  }

  padZero(str, len) {
    len = len || 2;
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
}
