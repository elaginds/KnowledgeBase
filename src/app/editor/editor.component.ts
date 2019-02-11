import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IoService } from '../service/io.service';
import { Document } from '../classes/document';

@Component({
  selector: 'app-editor-component',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  document = new Document({});

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.document.id = params.id;
        this.getDocument();
      }
    });
  }

  constructor(private io: IoService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  getDocument() {
    this.io.getDocument(this.document.id).then((document: any) => {
      console.log(document);
      this.document = document;
    });
  }

  onSave() {
    this.io.saveDocument(this.document)
      .then( (a) => {
        this.getDocument();
      });
  }

  onCancel() {
    this.router.navigate(['/documents', this.document.categoryId]).then((a) => {
      console.log(a);
    });
  }
}
