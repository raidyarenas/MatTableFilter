import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDatasource} from './mat-table-datasource';
import {DirectoryService} from '../../services/directory.service';
import {MatDialog} from '@angular/material/dialog';
import {DirectoryComponent} from '../directory/directory.component';
import {Directory} from '../../interfaces';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  title = 'MatTableFilter app is running!';
  filter: string;
  dataSource: MatTableDatasource;
  displayedColumns: string[] = [
    'id', 'code', 'name', 'address', 'town',
    'postal_code', 'city', 'phone', 'email', 'options'
  ];

  constructor(
    private directoryService: DirectoryService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDatasource(this.directoryService);
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .subscribe(() => this.loadData());
  }

  newDirectory(): void {
    const directory: Directory = {
      code: '',
      name: '',
      address: '',
      town: '',
      postal_code: '',
      city: '',
      phone: 0,
      email: '',
    };
    this.openDialog(directory, (data: Directory) => {
      this.directoryService.createDirectory(data).subscribe(
        (success: any) => this.loadData()
      );
    });
  }

  editDirectory(directory: Directory): void {
    this.openDialog(directory, (data: Directory) => {
      this.directoryService.putDirectory(data).subscribe(
        (success: any) => this.dataSource.loadDirectoriesData({})
      );
    });
  }

  openDialog(directory: Directory, callback): void {
    const dialogRef = this.dialog.open(DirectoryComponent, {
      maxWidth: '600px',
      data: { directory }
    });
    dialogRef.afterClosed().subscribe(result => (result !== undefined) ? callback(result) : '');
  }

  deleteDirectory(directory: Directory): void {
    this.directoryService.deleteDirectory(directory).subscribe(
      (success: any) => this.loadData()
    );
  }

  loadData(): void {
    this.dataSource.loadDirectoriesData({
      filter: this.filter,
      current_page: this.paginator?.pageIndex,
      per_page: this.paginator?.pageSize
    });
  }
}
