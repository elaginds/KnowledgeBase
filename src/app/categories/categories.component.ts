import { Component } from '@angular/core';
import { IoService } from '../service/io.service';
import { Category } from '../classes/category';

@Component({
  selector: 'app-categories-component',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  isShowCategories = true;
  search_icon = '';
  category = new Category(null);
  categories = [];

  constructor(private io: IoService) {
    this.getCategories();

    io.updateCategories$.subscribe( () => {
      this.getCategories();
    });

    io.show$.subscribe( name => {
      this.isShowCategories = name === 'categories';
    });
  }

  getCategories() {
    this.io.getCategories().then( (categories: any) => {
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

  onCategoryClick(category) {
    this.io.openCategory(category.id);
  }
}
