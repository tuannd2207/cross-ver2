import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ase-broker-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './broker-information.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrokerInformationComponent {

}
