import { Component } from '@angular/core';
import { IoService } from '../service/io.service';
import { Document } from '../classes/document';

@Component({
  selector: 'app-task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  isShowDocument = false;
  document = new Document(null);

  constructor(private io: IoService) {
    io.openDocument$.subscribe( id => {
      this.document.id = id;
      this.getDocument();
    });

    io.show$.subscribe(name => {
      this.isShowDocument = name === 'document';
    });
  }

  getDocument() {
    this.io.getDocument(this.document.id).then((document: any) => {
      this.document = document;
    });
  }

  onAddDocument() {
    this.io.addDocument(this.document);
  }
}
