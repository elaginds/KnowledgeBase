import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  static setItems(items, type) {
    localStorage.setItem(type, JSON.stringify(items));
  }

  public addItem(item, type) {
    return new Promise( resolve => {
      const allItems = this.getItems(null, type);
      allItems.push(item);
      StorageService.setItems(allItems, type);
      
      resolve();
    });    
  }

  public getItem(id, type) {
    let result = null;
    const items = this.getItems(null, type);

    items.forEach(item => {
      if (item.id === id) {
        result = item;
      }
    });

    return result;
  }

  public getItems(id, type) {
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

  public updateDocument(document) {
    const documents = this.getItems(null, 'documents');
    let flag = false;

    documents.forEach((doc, key) => {
      if (doc.id === document.id) {
        documents[key] = document;
        flag = true;
      }
    });

    StorageService.setItems(documents, 'documents');
  }
}
