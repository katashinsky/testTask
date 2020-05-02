import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material'
import { EffectsModule } from '@ngrx/effects'
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component'
import { AuthEffects } from './store/auth.effects'

@NgModule({
    declarations: [
        SnackBarComponent
    ],
    imports: [
        EffectsModule.forFeature([AuthEffects]),
        MatIconModule
    ],
    entryComponents: [
        SnackBarComponent
    ]
})
export class AuthModule { }
