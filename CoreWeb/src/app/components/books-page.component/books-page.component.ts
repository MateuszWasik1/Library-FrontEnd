import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { selectAuthors, selectBooks, selectCount, selectFilters, selectPublishers } from './books-page-state/books-page-state.selectors';
import { cleanState, deleteBook, loadAuthors, loadBooks, updatePaginationDataBooks, changeFilterAuthorValue, changeFilterGenreValue,changeFilterPublisherValue, loadPublishers } from './books-page-state/books-page-state.actions';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];

  public authors: any[] = []
  public publishers: any[] = []
  public genres: any[] = []
  public count: number = 0;

  public selectedFilterGenre: any;

  public Filters$ = this.store.select(selectFilters);
  public Books$ = this.store.select(selectBooks);
  public Count$ = this.store.select(selectCount);
  public Authors$ = this.store.select(selectAuthors);
  public Publishers$ = this.store.select(selectPublishers);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []

    this.genres = [
      {id: '0', name: 'Wszystkie'},
      {id: '1', name: 'Bajka'},
      {id: '2', name: 'Biografia'},
      {id: '3', name: 'Fantastyka'},
      {id: '4', name: 'Powieść'},
      {id: '5', name: 'Romans'},
    ];
  }

  ngOnInit(): void {
    this.store.dispatch(loadAuthors())
    this.store.dispatch(loadPublishers())

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadBooks())));
    this.subscriptions.push(this.Count$.subscribe(count => this.count = count));
    this.subscriptions.push(this.Authors$.subscribe(authors => this.authors = authors));
    this.subscriptions.push(this.Publishers$.subscribe(publishers => this.publishers = publishers));
  }

  public DisplayAuthor = (agid: number) => {
    let author = this.authors[this.authors.findIndex(author => author.agid == agid)]

    return `${author.aFirstName} ${author.aLastName}`
  };

  public DisplayPublisher = (pgid: number) => this.publishers[this.publishers.findIndex(publisher => publisher.pgid == pgid)].pName;

  public DisplayGenre = (genre: number) => this.genres[genre].name;

  public ChangeFilterGenreValue = (event: any) => this.store.dispatch(changeFilterGenreValue({ value: event.value }));

  public ChangeFilterAuthorValue = (event: any) => this.store.dispatch(changeFilterAuthorValue({ value: event.value }));

  public ChangeFilterPublisherValue = (event: any) => this.store.dispatch(changeFilterPublisherValue({ value: event.value }));

  public AddBook = () => this.router.navigate(['books/0']);

  public UpdateBook = (bgid: string) => this.router.navigate([`books/${bgid}`]);

  public DeleteBook = (bgid: string) => this.store.dispatch(deleteBook({ bgid: bgid }));

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updatePaginationDataBooks({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}