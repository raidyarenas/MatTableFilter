import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Directory} from '../../interfaces';
import {DirectoryService} from '../../services/directory.service';
import {catchError, finalize} from 'rxjs/operators';

export class MatTableDatasource extends DataSource<Directory> {

  private directorySubject = new BehaviorSubject<Directory[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public total: number;

  constructor(private directoryService: DirectoryService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Directory[]> {
    return this.directorySubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.directorySubject.complete();
    this.loadingSubject.complete();
  }

  loadDirectoriesData(params?: any): void {
    this.loadingSubject.next(true);
    this.directoryService.getAllDirectories(params)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe( (data: any) => {
        this.directorySubject.next(data.directories);
        this.total = data.total;
      });
  }
}
