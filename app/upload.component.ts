import { Component } from '@angular/core';
import { ChunkSettings } from '@progress/kendo-angular-upload';

@Component({
  selector: 'my-upload',
  template: `
    <p>Files will be split into chunks of 100kb</p>
    <kendo-upload
        [saveUrl]="uploadSaveUrl"
        [removeUrl]="uploadRemoveUrl"
        [chunkable]="chunkSettings">
    </kendo-upload>
  `
})
export class UploadComponent {
   uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

    public chunkSettings: ChunkSettings = {
        size: 102400
    };
}

