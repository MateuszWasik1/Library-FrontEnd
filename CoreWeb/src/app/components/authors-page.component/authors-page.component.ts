import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { selectAuthors, selectCount, selectFilters } from './authors-page-state/authors-page-state.selectors';
import { cleanState, deleteAuthor, loadAuthors, updatePaginationDataAuthors } from './authors-page-state/authors-page-state.actions';

@Component({
  selector: 'app-authors-page',
  templateUrl: './authors-page.component.html',
  styleUrls: ['./authors-page.component.scss']
})
export class AuthorsPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];

  public count: number = 0;

  public Filters$ = this.store.select(selectFilters);
  public Authors$ = this.store.select(selectAuthors);
  public Count$ = this.store.select(selectCount);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadAuthors())));
    this.subscriptions.push(this.Count$.subscribe(count => this.count = count));
  }

  public AddAuthor = () => this.router.navigate(['authors/0']);

  public UpdateAuthor = (agid: string) => this.router.navigate([`authors/${agid}`]);

  public DeleteAuthor = (agid: string) => {
    this.store.dispatch(deleteAuthor({ agid: agid }));
  }

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updatePaginationDataAuthors({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}