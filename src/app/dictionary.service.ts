import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  resultsArray = [];
  constructor(private http:HttpClient) { }

  fetchResults(searchWord:string){
    return this.http.get('https://api.dictionaryapi.dev/api/v2/entries/en_US/'+searchWord)
    .pipe(map(responseData => {
      this.resultsArray = [];
      for(let resultMeanings of responseData[0].meanings){
        this.resultsArray.push({
          partOfSpeech: resultMeanings.partOfSpeech,
          definition: resultMeanings.definitions[0].definition,
          example: resultMeanings.definitions[0].example
        });
      }
      return this.resultsArray;
    }));
  }
}
