import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UploadComponent } from './upload.component';
import { AppComponent, UploadInterceptor } from './app.component';

@NgModule({
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      UploadsModule
    ],
    declarations: [AppComponent, UploadComponent],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UploadInterceptor,
            multi: true
        }
    ]
})
export class AppModule {}
