import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Dictionary } from './dictionary.model';
import { DictionaryService } from './dictionary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  results:Dictionary[] = [];
  error = null;
  constructor(private http: HttpClient, private dictionaryService:DictionaryService){}
  

  onSubmit(form:NgForm){
    this.error = null;
    this.results = [];
    
    let searchWord = form.value.search;
    this.dictionaryService.fetchResults(searchWord).subscribe(responseData => {
      this.results = responseData;
    }, errorRes => {
      this.error = errorRes.error['title'];
    });
  }
}
