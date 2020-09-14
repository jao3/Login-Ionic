import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { ProductService } from 'src/app/shared/services/db/buy/poduct.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page],
  providers: [ProductService]
})
export class Tab2PageModule {}
