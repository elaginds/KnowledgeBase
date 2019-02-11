import { Injectable } from '@angular/core';
import { StorageService } from './storage';
import { Category } from '../classes/category';
import { Document} from '../classes/document';
import { Subject } from 'rxjs';

@Injectable()
export class IoService {
  type = 'storage';

  public showSource = new Subject<any>();
  public show$ = this.showSource.asObservable();

  public updateCategoriesSource = new Subject<any>();
  public updateCategories$ = this.updateCategoriesSource.asObservable();

  public updateDocumentsSource = new Subject<any>();
  public updateDocuments$ = this.updateDocumentsSource.asObservable();


  constructor(private storage: StorageService) {

  }

  public addCategory(category) {
    const full_category = new Category(category);

    if (this.type === 'storage') {
      this.storage.addItem(full_category, 'categories').then( () => {
        this.updateCategoriesSource.next();
      });
    }
  }

  public addDocument(document) {
    const full_document = new Document(document);

    if (this.type === 'storage') {
      this.storage.addItem(full_document, 'documents').then( () => {
        this.updateDocumentsSource.next();
      });
    }
  }


  public getCategories() {
    return new Promise( (resolve) => {
      if (this.type === 'storage') {
        resolve(this.storage.getItems(null, 'categories'));
      }
    });
  }

  public getDocuments(id) {
    return new Promise( (resolve) => {
      if (this.type === 'storage') {
        const category = this.storage.getItem(id, 'categories');
        const documents = this.storage.getItems(id, 'documents');

        if (documents.length) {
          documents.forEach(doc => {
            doc.categoryName = category.name;
          });
        } else {
          documents.push(category.name);
        }

        resolve(documents);
      }
    });
  }

  public getDocument(id) {
    return new Promise( (resolve) => {
      if (this.type === 'storage') {
        const document = this.storage.getItem(id, 'documents');
        const category = this.storage.getItem(document.categoryId, 'categories');

        document.categoryName = category.name;

        resolve(document);
      }
    });
  }


  public saveCategory(id, name) {

  }

  public saveDocument(document) {
    return new Promise( (resolve) => {
      if (this.type === 'storage') {
        this.storage.updateDocument(document);

        resolve(true);
      }
    });
  }
}
