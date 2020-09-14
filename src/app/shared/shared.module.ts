import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ThemeConstantService} from './services/app/utils/theme-constant.service';
import {SearchPipe} from './pipes/search.pipe';


@NgModule({
    exports: [
        CommonModule,
        FormsModule
 
    ],
    imports: [
        RouterModule,
        CommonModule
   
    ],
    declarations: [
    
    ],
    providers: [
       ThemeConstantService
    ]
})

export class SharedModule { }
