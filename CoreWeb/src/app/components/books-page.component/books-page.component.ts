import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { selectBooks, selectCount, selectFilters } from './books-page-state/books-page-state.selectors';
import { cleanState, deleteBook, loadBooks, updatePaginationDataBooks } from './books-page-state/books-page-state.actions';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];

  public genres: any[] = []
  public count: number = 0;

  public Filters$ = this.store.select(selectFilters);
  public Books$ = this.store.select(selectBooks);
  public Count$ = this.store.select(selectCount);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []

    this.genres = [
      {id: '1', name: 'Bajka'},
      {id: '2', name: 'Biografia'},
      {id: '3', name: 'Fantastyka'},
      {id: '4', name: 'Powieść'},
      {id: '5', name: 'Romans'},
    ];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadBooks())));
    this.subscriptions.push(this.Count$.subscribe(count => this.count = count));
  }

  public DisplayGenre = (genre: number) => this.genres[genre - 1].name; //- 1 because genres ids starts with 1 not 0

  public AddBook = () => this.router.navigate(['books/0']);

  public UpdateBook = (bgid: string) => this.router.navigate([`books/${bgid}`]);

  public DeleteBook = (bgid: string) => {
    this.store.dispatch(deleteBook({ bgid: bgid }));
  }

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updatePaginationDataBooks({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}