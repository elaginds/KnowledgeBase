import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IoService } from '../service/io.service';
import { Document } from '../classes/document';

@Component({
  selector: 'app-documents-component',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  document = new Document(null);
  documents = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.document.categoryId = params.id;
        this.getDocuments();
      }
    });
  }

  constructor(private io: IoService,
              private route: ActivatedRoute) {
    io.updateDocuments$.subscribe( () => {
      this.getDocuments();
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
}
