import {Component, EventEmitter, Input, Output, ViewChild,} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {
  AsyncPipe,
  CurrencyPipe,
  KeyValuePipe,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  NgTemplateOutlet,
} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {MenuItem, SharedModule} from 'primeng/api';
import {Table, TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {AseIconComponent} from '../ase-icon/ase-icon.component';
import {FileUploadModule} from 'primeng/fileupload';
import {TableHeader} from '@share/table-header.model';
import {MenuModule} from 'primeng/menu';
import {SplitButtonModule} from 'primeng/splitbutton';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TagModule} from 'primeng/tag';
import {ForceStatusTypePipe} from '@share/force-status-type.pipe';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {TranslateModule} from '@ngx-translate/core';
import {AseBackgroundTagComponent} from '@share/ase-background-tag/ase-background-tag.component';
import {SystemParametersActionsEnum} from "../../../features/system-parameters/models/system-parameters.model";
import {ActionEventsEnum} from "@share/share-enum";
import TRANSLATION_PATH from "@app/translation-path.enum";
import {StatusType} from "../../../features/users-management/models/users-management.model";

export interface AseMenuItem extends MenuItem {
  showIn?: StatusType[],
  keyMapAction?: string;
}
@Component({
  selector: 'ase-data-table',
  standalone: true,
  imports: [
    ButtonModule,
    CurrencyPipe,
    InputTextModule,
    RatingModule,
    RippleModule,
    SharedModule,
    TableModule,
    FormsModule,
    NgOptimizedImage,
    KeyValuePipe,
    NgForOf,
    AseIconComponent,
    FileUploadModule,
    NgIf,
    NgTemplateOutlet,
    MenuModule,
    SplitButtonModule,
    OverlayPanelModule,
    TagModule,
    ForceStatusTypePipe,
    PaginatorModule,
    AsyncPipe,
    TranslateModule,
    AseBackgroundTagComponent,
  ],
  templateUrl: './ase-data-table.component.html',
})

export class AseDataTableComponent<T, A> {
  @ViewChild('dt') dt!: Table;
  @Input() actionEvents: AseMenuItem[] = [
    {
      label:
        TRANSLATION_PATH.COMMON + SystemParametersActionsEnum.EDIT,
      action: SystemParametersActionsEnum.EDIT,
      icon: 'edit',
      keyMapAction: 'status',
      showIn: ['PENDING', 'INACTIVE'],
    },
    {
      label: TRANSLATION_PATH.COMMON + ActionEventsEnum.APPROVE,
      action: SystemParametersActionsEnum.APPROVE,
      icon: 'approve',
      keyMapAction: 'status',
      showIn: ['ACTIVE', 'PENDING']
    },
  ]
  @Input() frozenColumn = '';
  @Input() showCheckedRow = false;
  @Input() showSearch = false;
  @Input({required: true}) data!: T[];
  @Input({required: true}) cols: TableHeader[] = [];
  @Input() rows = 10;
  @Input() paginator = true;
  @Input() totalRecords = 0;
  @Input() globalFilterFields: string[] = [];
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Input() sortAble = false;
  @Output() selectedItem: EventEmitter<T[]> = new EventEmitter<T[]>();
  @Output() pageChange: EventEmitter<PaginatorState> =
    new EventEmitter<PaginatorState>();
  @Output() sendActionEvents: EventEmitter<{
    event: A;
    record: T;
  }> = new EventEmitter<{ event: A; record: T }>();
  selectedItems: T[] = [];
  first = 0;
  onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
