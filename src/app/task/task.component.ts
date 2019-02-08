import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IoService } from '../service/io.service';
import { Document } from '../classes/document';

@Component({
  selector: 'app-task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  document = new Document(null);

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
    io.openDocument$.subscribe( id => {
      this.document.id = id;
      this.getDocument();
    });
  }

  getDocument() {
    this.io.getDocument(this.document.id).then((document: any) => {
      this.document = document;
    });
  }

  onSave() {

  }

  onCancel() {
    this.router.navigate(['/documents', this.document.categoryId]).then((a) => {
      console.log(a);
    });
  }
}
