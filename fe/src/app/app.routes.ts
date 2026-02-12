import { Routes } from '@angular/router';
import { FilesComponent } from './features/files/files';
import { UploadComponent } from './features/upload/upload';
import { PreviewComponent } from './features/preview/preview';

export const routes: Routes = [
  {
    path: '',
    component: FilesComponent,
    data: { breadcrumb: 'Files' }
  },
  {
    path: 'upload',
    component: UploadComponent,
    data: { breadcrumb: 'Upload' }
  },
  {
    path: 'preview/:id',
    component: PreviewComponent,
    data: { breadcrumb: 'Preview' }
  }
];


