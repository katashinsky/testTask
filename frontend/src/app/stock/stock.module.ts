import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material'
import { EffectsModule } from '@ngrx/effects'
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component'
import { StocksEffects } from './store/stock.effects'

@NgModule({
    imports: [
        EffectsModule.forFeature([StocksEffects]),
        MatIconModule
    ]
})
export class StockModule { }
