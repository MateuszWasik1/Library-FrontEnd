import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslationService } from 'src/app/services/translate.service';
import { Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { selectCount, selectFilters, selectPublishers } from './publishers-page-state/publishers-page-state.selectors';
import { cleanState, deletePublisher, loadPublishers, updatePaginationDataPublishers } from './publishers-page-state/publishers-page-state.actions';

@Component({
  selector: 'app-publishers-page',
  templateUrl: './publishers-page.component.html',
  styleUrls: ['./publishers-page.component.scss']
})
export class PublishersPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];

  public count: number = 0;

  public Filters$ = this.store.select(selectFilters);
  public Publishers$ = this.store.select(selectPublishers);
  public Count$ = this.store.select(selectCount);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadPublishers())));
    this.subscriptions.push(this.Count$.subscribe(count => this.count = count));
  }

  public AddPublisher = () => this.router.navigate(['publishers/0']);

  public UpdatePublisher = (pgid: string) => this.router.navigate([`publishers/${pgid}`]);

  public DeletePublisher = (pgid: string) => this.store.dispatch(deletePublisher({ pgid: pgid }));

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updatePaginationDataPublishers({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}