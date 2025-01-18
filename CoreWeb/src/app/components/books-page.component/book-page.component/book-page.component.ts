import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { addBook, cleanState, loadAuthors, loadBook, loadPublishers, updateBook } from '../books-page-state/books-page-state.actions';
import { selectAuthors, selectBook, selectErrorMessage, selectPublishers } from '../books-page-state/books-page-state.selectors';
import { Guid } from 'guid-typescript';

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
  public genres: any[] = []

  public selectedAuthor: string = '';
  public selectedPublisher: string = '';
  public selectedGenre: number = 0;

  public Book$ = this.store.select(selectBook);
  public Authors$ = this.store.select(selectAuthors);
  public Publishers$ = this.store.select(selectPublishers);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public route: ActivatedRoute,
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
    this.store.dispatch(loadAuthors());
    this.store.dispatch(loadPublishers());

    this.bgid = this.route.snapshot.paramMap.get('bgid') ?? "";
    this.isNewBookView = this.bgid == "" || this.bgid == "0";

    if(!this.isNewBookView)
      this.store.dispatch(loadBook({ BGID: this.bgid }));

    this.subscriptions.push(
      this.Book$.subscribe(x => {
        this.form = new FormGroup({
          BGID: new FormControl( x.BGID, { validators: [] }),
          BAuthorGID: new FormControl( { value: x.BAuthorGID, disabled: true }, { validators: [] }),
          BPublisherGID: new FormControl( { value: x.BPublisherGID, disabled: true }, { validators: [] }),
          BTitle: new FormControl( x.BTitle, { validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(255) ] }),
          BISBN: new FormControl( x.BISBN, { validators: [ Validators.required, Validators.minLength(13), Validators.maxLength(13) ] }),
          BGenre: new FormControl( x.BGenre, { validators: [] }),
          BLanguage: new FormControl( x.BLanguage, { validators: [ Validators.required, Validators.maxLength(255) ] }),
          BDescription: new FormControl( x.BDescription, { validators: [ Validators.maxLength(2000) ] }),
        })

        this.selectedAuthor = x.BAuthorGID;
        this.selectedPublisher = x.BPublisherGID;
        this.selectedGenre = this.genres[x.BGenre - 1].id;
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
      "BAuthorGID": this.selectedAuthor,
      "BPublisherGID": this.selectedPublisher,
      "BTitle": this.form.get("BTitle")?.value,
      "BISBN": this.form.get("BISBN")?.value,
      "BGenre": this.selectedGenre,
      "BLanguage": this.form.get("BLanguage")?.value,
      "BDescription": this.form.get("BDescription")?.value,
    }

    if(model.BGID == "0" || model.BGID == ""){
      model.BGID = Guid.create().toString()
      this.store.dispatch(addBook({ Book: model }));
    }
    else
      this.store.dispatch(updateBook({ Book: model }));
  }

  public Cancel = () => this.router.navigate(["/books"]);

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}