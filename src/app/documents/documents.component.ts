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
  categoryName = '';
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
      console.log(docs);
      if (docs && docs[0] && docs[0].categoryName) {
        this.categoryName = docs[0].categoryName;
      } else if (docs && docs[0] && typeof docs[0] === 'string') {
        this.categoryName = docs[0];
        docs = [];
      }

      this.documents = docs;
    });
  }

  onAddDocument() {
    this.io.addDocument(this.document);
  }
}
