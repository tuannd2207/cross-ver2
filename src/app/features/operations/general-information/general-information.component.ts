import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { PartnerInformationComponent } from './partner-information/partner-information.component';
import { BrokerInformationComponent } from './broker-information/broker-information.component';
import TRANSLATION_PATH from '@app/translation-paths.enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ase-general-information',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    PartnerInformationComponent,
    BrokerInformationComponent,
    TranslateModule,
  ],
  templateUrl: './general-information.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralInformationComponent {
  TRANSLATION_PATH = TRANSLATION_PATH.GENERAL_INFORMATION;
}
