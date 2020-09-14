import { Component, OnInit } from '@angular/core';
import { ProductEntity } from 'src/app/shared/entity/db/buy/ProductEntity';
import { ProductService } from 'src/app/shared/services/db/buy/poduct.service';
import { Page } from 'src/app/shared/entity/app/utils/Page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  

  constructor(private productService: ProductService) {
    
  }

  listProduts: Page<ProductEntity> = new Page<ProductEntity>();


  searchEvent(event){
    const texto = event.target.value;
    console.log (texto);
  }


  ngOnInit(): void {

    this.productService.getAssessmentAll({
      assessmentDate: new Date(2020, 3, 6),
      name: { tp: 'C', value: 'iogurte' },
      identifier: null,
      number: null,
      ncmNumber: null
    }, this.listProduts).subscribe(value => {
      this.listProduts = value;
      console.log(this.listProduts.content);
    });
    
  }


}
