import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit {
  title = 'MatTableFilter app is running!';
  constructor() { }

  ngOnInit(): void {
  }

}
