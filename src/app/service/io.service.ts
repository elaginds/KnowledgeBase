import { Injectable } from '@angular/core';
import { Category } from '../classes/category';
import { Document} from '../classes/document';
import { Subject } from 'rxjs';

@Injectable()
export class IoService {
  type = 'storage';

  public showSource = new Subject<any>();
  public show$ = this.showSource.asObservable();

  public openDocumentSource = new Subject<any>();
  public openDocument$ = this.openDocumentSource.asObservable();

  public openCategorySource = new Subject<any>();
  public openCategory$ = this.openCategorySource.asObservable();

  public updateCategoriesSource = new Subject<any>();
  public updateCategories$ = this.updateCategoriesSource.asObservable();

  public updateDocumentsSource = new Subject<any>();
  public updateDocuments$ = this.updateDocumentsSource.asObservable();


  public addCategory(category) {
    const full_category = new Category(category);

    if (this.type === 'storage') {
      this.addItemToStorage(full_category, 'categories');
    }
  }

  public addDocument(document) {
    const full_document = new Document(document);

    if (this.type === 'storage') {
      this.addItemToStorage(full_document, 'documents');
    }
  }


  public getCategories() {
    return new Promise( (resolve) => {
      if (this.type === 'storage') {
        resolve(this.getItemsFromStorage(null, 'categories'));
      }
    });
  }

  public getDocuments(id) {
    return new Promise( (resolve) => {
      if (this.type === 'storage') {
        const category = this.getItemFromStorage(id, 'categories');
        const documents = this.getItemsFromStorage(id, 'documents');

        documents.forEach( doc => {
          doc.categoryName = category.name;
        });

        resolve(documents);
      }
    });
  }

  public getDocument(id) {
    return new Promise( (resolve) => {
      if (this.type === 'storage') {
        const document = this.getItemFromStorage(id, 'documents');

        resolve(document);
      }
    });
  }


  public saveCategory(id, name) {

  }

  public saveDocument(id, name) {

  }


  public openCategory(id) {
    this.openCategorySource.next(id);
    this.showSource.next('documents');
  }

  public openDocument(id) {
    this.openDocumentSource.next(id);
    this.showSource.next('document');
  }


  public backToCategories() {
    this.showSource.next('categories');
    this.updateCategoriesSource.next();
  }

  public backToDocuments() {
    this.showSource.next('documents');
  }


  private addItemToStorage(item, type) {
    const allItems = this.getItemsFromStorage(null, type);

    allItems.push(item);

    this.setAllItemsToStorage(allItems, type);
  }

  private getItemFromStorage(id, type) {
    let result = null;
    const items = this.getItemsFromStorage(null, type);

    items.forEach(item => {
      if (item.id === id) {
        result = item;
      }
    });

    return result;
  }

  private getItemsFromStorage(id, type) {
    const itemsStr = localStorage.getItem(type);
    const itemsArr = itemsStr ? JSON.parse(itemsStr) : [];

    let result = [];

    if (id !== null) {
      itemsArr.forEach(item => {
        if ( (type === 'documents' && item.categoryId === id) || (type === 'tasks' && item.documentId === id)) {
          result.push(item);
        }
      });
    } else {
      result = itemsArr;
    }

    return result;
  }

  private setAllItemsToStorage(items, type) {
    localStorage.setItem(type, JSON.stringify(items));

    if (type === 'categories') {
      this.updateCategoriesSource.next();
    } else if (type === 'documents') {
      this.updateDocumentsSource.next();
    }
  }
}
