import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatListModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule} from '@angular/material';

/*https://www.npmjs.com/package/ngx-color-picker*/
import { ColorPickerModule } from 'ngx-color-picker';

/*https://www.npmjs.com/package/ngx-icon-picker*/
import { IconPickerModule } from 'ngx-icon-picker';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { DocumentsComponent } from './documents/documents.component';
import { EditorComponent } from './editor/editor.component';

import { IoService } from './service/io.service';
import { StorageService } from './service/storage';
import { RequestService } from './service/request.service';
import { ErrorService } from './service/error.service';

const appRoutes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'documents/:id',      component: DocumentsComponent },
  { path: 'document/:id',      component: EditorComponent },
  { path: '', component: CategoriesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    DocumentsComponent,
    EditorComponent
  ],
  imports: [
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
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
    StorageService,
    RequestService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
