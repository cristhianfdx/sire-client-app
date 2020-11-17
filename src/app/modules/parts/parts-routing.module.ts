import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPartComponent } from './components/modal/modal-part.component';
import { PartsComponent } from './components/parts/parts.component';

const routes: Routes = [
  {
    path: '',
    component: PartsComponent,
  },
  {
    path: 'management',
    component: ModalPartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartsRoutingModule {}
