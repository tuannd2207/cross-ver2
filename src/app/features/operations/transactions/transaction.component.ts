import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ase-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionComponent {}
