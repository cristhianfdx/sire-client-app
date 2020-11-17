import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ModalUserComponent } from './components/modal/modal-user.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'management',
    component: ModalUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
