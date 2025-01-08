import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { selectBooks, selectFilters } from './books-page-state/books-page-state.selectors';
import { cleanState, deleteBook, loadBooks } from './books-page-state/books-page-state.actions';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit, OnDestroy {

  public subscriptions: Subscription[];

  public Filters$ = this.store.select(selectFilters);
  public Books$ = this.store.select(selectBooks);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadBooks())));
  }

  public AddBook = () => this.router.navigate(['books/0']);

  public UpdateBook = (bgid: string) => this.router.navigate([`books/${bgid}`]);

  public DeleteBook = (bgid: string) => {
    this.store.dispatch(deleteBook({ bgid: bgid }));
  }

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updatePaginationDataTasks({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}

function updatePaginationDataTasks(arg0: { PaginationData: any; }): any {
  throw new Error('Function not implemented.');
}
