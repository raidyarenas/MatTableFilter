import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatTableComponent} from './components/mat-table/mat-table.component';

const routes: Routes = [
  {
    path: '',
    component: MatTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
