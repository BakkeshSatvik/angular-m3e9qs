import { Component, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpProgressEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of, concat } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ChunkMetadata } from '@progress/kendo-angular-upload';

@Component({
    selector: 'my-app',
    template: `<my-upload></my-upload>`
})
export class AppComponent {
}

/*
  Mocked backend service.
  For further details, check
  https://angular.io/guide/http#writing-an-interceptor
*/

@Injectable()
export class UploadInterceptor implements HttpInterceptor {
    public fileMap = [];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url === 'saveUrl') {
            if (!this.isIE()) {
                // Parsing the file metadata.
                const metadata: ChunkMetadata = JSON.parse(req.body.get('metadata'));

                // Retrieving the uid of the uploaded file.
                const fileUid = metadata.fileUid;

                if (metadata.chunkIndex === 0) {
                    this.fileMap[fileUid] = [];
                }

                // Storing the chunks of the file.
                this.fileMap[fileUid].push(req.body.get('files'));

                // Checking if this is the last chunk of the file
                if (metadata.chunkIndex === metadata.totalChunks - 1) {
                    // Reconstructing the initial file
                    // const completeFile = new Blob(
                    //     this.fileMap[metadata.fileUid],
                    //     { type: metadata.contentType }
                    // );
                }
            }

            const events: Observable<HttpEvent<any>>[] = [30, 60, 100].map((x) => of(<HttpProgressEvent>{
                type: HttpEventType.UploadProgress,
                loaded: x,
                total: 100
              }));

            const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));
            events.push(success);

            return concat(...events);
        }

        if (req.url === 'removeUrl') {
            return of(new HttpResponse({ status: 200 }));
        }

        return next.handle(req);
    }

    public isIE(): RegExpMatchArray {
        return window.navigator.userAgent.match(/(MSIE|Trident)/);
    }
}
