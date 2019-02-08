import { Component } from '@angular/core';
import { IoService } from '../service/io.service';
import { Document } from '../classes/document';

@Component({
  selector: 'app-documents-component',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  isShowDocuments = false;
  document = new Document(null);
  documents = [];

  constructor(private io: IoService) {
    io.openCategory$.subscribe( id => {
      this.document.categoryId = id;
      this.getDocuments();
    });

    io.updateDocuments$.subscribe( () => {
      this.getDocuments();
    });

    io.show$.subscribe(name => {
      this.isShowDocuments = name === 'documents';
    });
  }

  getDocuments() {
    this.io.getDocuments(this.document.categoryId).then((docs: any) => {
      this.documents = docs;
    });
  }

  onAddDocument() {
    this.io.addDocument(this.document);
  }

  onDocumentClick(item) {
    this.io.openDocument(item.id);
  }

  onBackButtonClick() {
    this.io.backToCategories();
  }
}
