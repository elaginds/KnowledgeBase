import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

/*https://www.npmjs.com/package/ngx-color-picker*/
import { ColorPickerModule } from 'ngx-color-picker';

/*https://www.npmjs.com/package/ngx-icon-picker*/
import { IconPickerModule } from 'ngx-icon-picker';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { DocumentsComponent } from './documents/documents.component';
import { TaskComponent } from './task/task.component';

import { IoService } from './service/io.service';
import { RequestService } from './service/request.service';
import { ErrorService } from './service/error.service';

const appRoutes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'documents/:id',      component: DocumentsComponent },
  { path: 'document/:id',      component: TaskComponent },
  { path: '', component: CategoriesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    DocumentsComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ColorPickerModule,
    IconPickerModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    IoService,
    RequestService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
