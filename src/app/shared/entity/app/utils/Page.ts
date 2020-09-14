export class Page<T>  {
  content: Array<T>;
  pageable: Pageable;
  totalElements: number = 0;
  totalPages: number;
  last: boolean;
  number: number = 1;
  size: number = 25;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
  pageSizeList: Array<number>;
  isAllDisplayDataChecked: Boolean = false;
  mapOfCheckedId: Array<string> = new Array<string>();

  constructor(newPage?: Page<T> , page?: Page<T>) {
    if (!page && !newPage) {
      this.content = new Array<T>();
      this.pageable = new Pageable();
      this.totalElements = 0;
      this.totalPages = 0;
      this.last = false;
      this.sort = new Sort();
      this.first = true;
      this.numberOfElements = 0;
      this.empty = true;
      this.pageSizeList = new Array<number>();
      this.pageSizeList = [25, 50, 75, 100];
      this.number = 1;
      this.size = 25;
      this.isAllDisplayDataChecked = false;
      this.mapOfCheckedId = new Array<string>();

    } else if ( !page ) {
      this.content = newPage.content;
      this.pageable = newPage.pageable;
      this.totalElements = newPage.totalElements;
      this.totalPages = newPage.totalPages;
      this.last = newPage.last;
      this.sort = newPage.sort;
      this.first = newPage.first;
      this.numberOfElements = newPage.numberOfElements;
      this.empty = newPage.empty;
      this.pageSizeList = [25, 50, 75, 100];
      this.number = newPage.number + 1;
      this.size = newPage.size;
      this.isAllDisplayDataChecked = false;
      this.mapOfCheckedId =  new Array<string>();

    } else if (page && newPage) {
      this.content = newPage.content;
      this.pageable = newPage.pageable;
      this.totalElements = newPage.totalElements;
      this.totalPages = newPage.totalPages;
      this.last = newPage.last;
      this.sort = newPage.sort;
      this.first = newPage.first;
      this.numberOfElements = newPage.numberOfElements;
      this.empty = newPage.empty;
      this.pageSizeList = [25, 50, 75, 100];
      this.number = newPage.number + 1;
      this.size = newPage.size;
      this.isAllDisplayDataChecked = page.isAllDisplayDataChecked;
      this.mapOfCheckedId =  page.mapOfCheckedId;
    }
  }

  checkAll(value: boolean ): void {
    this.mapOfCheckedId = [];
    this.isAllDisplayDataChecked = value;
  }

  checkChange(value: string, is: Boolean) {

    if (this.isAllDisplayDataChecked) {
      if (!is) {
        // adiciona no array
        this.mapOfCheckedId.push(value);

      } else {
        // remove do array
        this.mapOfCheckedId.splice(this.mapOfCheckedId.indexOf(value), 1);
      }
    } else {
      if (is) {
        // adiciona no array
        this.mapOfCheckedId.push(value);
      } else {
        // remove do array
        this.mapOfCheckedId.splice(this.mapOfCheckedId.indexOf(value), 1);
      }
    }

  }

  isSelected(value: string): Boolean {

    if (!this.isAllDisplayDataChecked) {
      return this.mapOfCheckedId.indexOf(value) > -1;
    } else {
      return this.mapOfCheckedId.indexOf(value) === -1;
    }
  }

}

export class Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;

    constructor() {
      this.sort = new Sort();
      this.offset = 0;
      this.pageNumber = 0;
      this.pageSize = 0;
      this.unpaged = false;
      this.paged = false;
    }
}

export class Sort {
  sorted: boolean ;
  unsorted: boolean ;
  empty: boolean ;

  constructor() {
    this.sorted = false ;
    this.unsorted = false ;
    this.empty = true ;
  }
}
