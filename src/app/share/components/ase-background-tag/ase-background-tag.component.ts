import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DataToTypeMapping } from '@share/share.constant';
import { ForceStatusTypePipe } from '@share/force-status-type.pipe';
import TRANSLATION_PATH from '@app/translation-path.enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ase-background-tag',
  standalone: true,
  imports: [CommonModule, TagModule, ForceStatusTypePipe, TranslateModule],
  templateUrl: './ase-background-tag.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AseBackgroundTagComponent {
  @Input() value = '';
  protected readonly DataToTypeMapping = DataToTypeMapping;
  protected readonly TRANSLATION_PATH = TRANSLATION_PATH;
}
