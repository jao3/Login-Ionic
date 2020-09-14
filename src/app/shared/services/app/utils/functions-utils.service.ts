import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Page} from '../../../entity/app/utils/Page';
import {LookupSearch} from '../../../entity/app/utils/LookupSearch';

@Injectable({
  providedIn: 'root'
})
export class FunctionsUtilsService {

  constructor() { }

  loadLookup(search: BehaviorSubject<LookupSearch>, term: string) {

        const lookupSearch = new LookupSearch();

        lookupSearch.term = term;
        lookupSearch.page = false;
        lookupSearch.open = true;

        search.next( lookupSearch );

  }

  openLookup(search: BehaviorSubject<LookupSearch>, open: boolean, page: Page<any>) {

    if (open) {
        const lookupSearch = new LookupSearch();

        lookupSearch.term = '';
        lookupSearch.page = false;
        lookupSearch.open = true;

        search.next(lookupSearch);

    } else {
      page.content.splice(0, page.content.length);
      page.number = 1;
      page.totalPages = 1;
    }
  }

  pageLookup( search: BehaviorSubject<LookupSearch>, page: Page<any> ) {
    if ( page ) {
      if (  page.number <  page.totalPages)  {
        page.number++;

        let lookupSearch = new LookupSearch();

        lookupSearch.term = search.value.term;
        lookupSearch.page = true;
        lookupSearch.open = true;

        search.next(lookupSearch );
      }
    }
  }


}
