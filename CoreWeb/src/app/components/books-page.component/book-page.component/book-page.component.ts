import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { addBook, cleanState, loadBook, updateBook } from '../books-page-state/books-page-state.actions';
import { selectBook, selectErrorMessage } from '../books-page-state/books-page-state.selectors';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})

export class BookPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];

  public form: FormGroup = new FormGroup({});
  public bgid: string = "";
  public isNewBookView: boolean = true;

  public Book$ = this.store.select(selectBook);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public route: ActivatedRoute,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.bgid = this.route.snapshot.paramMap.get('bgid') ?? "";
    this.isNewBookView = this.bgid == "" || this.bgid == "0";

    if(!this.isNewBookView)
      this.store.dispatch(loadBook({ BGID: this.bgid }));

    this.subscriptions.push(
      this.Book$.subscribe(x =>{
        this.form = new FormGroup({
          BGID: new FormControl( x.BGID, { validators: [] }),
          BAuthorGID: new FormControl( x.BAuthorGID, { validators: [] }),
          BPublisherGID: new FormControl( x.BPublisherGID, { validators: [] }),
          BTitle: new FormControl( x.BTitle, { validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(255) ] }),
          BISBN: new FormControl( x.BISBN, { validators: [ Validators.required, Validators.minLength(13), Validators.maxLength(13) ] }),
          BGenre: new FormControl( x.BGenre, { validators: [] }),
          BLanguage: new FormControl( x.BGenre, { validators: [ Validators.required, Validators.maxLength(255) ] }),
          BDescription: new FormControl( x.BGenre, { validators: [ Validators.maxLength(2000) ] }),
        })
      })
    );

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    );
  }

  public SaveBook = () => {
    let model = {
      "BGID": this.form.get("BGID")?.value,
      "BAuthorGID": this.form.get("BAuthorGID")?.value,
      "BPublisherGID": this.form.get("TName")?.value,
      "BTitle": this.form.get("TLocalization")?.value,
      "BISBN": this.form.get("TTime")?.value,
      "BGenre": this.form.get("TBudget")?.value,
      "BLanguage": this.form.get("BLanguage")?.value,
      "BDescription": this.form.get("BDescription")?.value,
    }

    if(model.BGID == "0" || model.BGID == "")
      this.store.dispatch(addBook({ Book: model }));
    else
      this.store.dispatch(updateBook({ Book: model }));
  }

  public Cancel = () => this.router.navigate(["/books"]);

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}