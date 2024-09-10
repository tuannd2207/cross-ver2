import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AseDropdownTranslatePipe } from '@share/ase-dropdown-translate.pipe';
import { AseTypographyDirective } from '@share/ase-typography.directive';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ase-policy-search',
  standalone: true,
  imports: [
    CommonModule,
    AseDropdownTranslatePipe,
    AseTypographyDirective,
    DropdownModule,
    FormsModule,
    InputTextModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './policy-search.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicySearchComponent {}
