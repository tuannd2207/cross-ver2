import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  AsyncPipe,
  CurrencyPipe,
  KeyValuePipe,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  NgTemplateOutlet,
} from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { AseIconComponent } from '../ase-icon/ase-icon.component';
import { FileUploadModule } from 'primeng/fileupload';
import { TableHeader } from '@share/table-header.model';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagModule } from 'primeng/tag';
import { ForceStatusTypePipe } from '@share/force-status-type.pipe';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { AseBackgroundTagComponent } from '@share/ase-background-tag/ase-background-tag.component';
import { AseEventItem } from '@share/ase-event-item.model';
import TRANSLATION_PATH from '@app/translation-paths.enum';
import { ActionEventsEnum } from '@share/share-enum';
import { SystemParametersActionsEnum } from '../../../features/system-management/system-parameters/models/system-parameters.model';
import { BehaviorSubject } from 'rxjs';

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
  styles: [
    `
      :host {
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        ::ng-deep {
          p-table {
            height: 100%;
          }
          .p-datatable-wrapper {
            height: 100%;
          }
        }
      }
    `,
  ],
  providers: [],
})
export class AseDataTableComponent<T, A> implements AfterViewChecked {
  @ViewChild('dt') dt!: Table;
  private el = inject(ElementRef);
  paginatorFlTableRows = new BehaviorSubject<boolean>(true);

  @Input() actionEvents: AseEventItem[] = [
    {
      label: TRANSLATION_PATH.COMMON + SystemParametersActionsEnum.EDIT,
      action: SystemParametersActionsEnum.EDIT,
      icon: 'edit',
      keyMapAction: 'status',
      showIn: ['PENDING', 'INACTIVE', 'ACTIVE'],
    },
    {
      label: TRANSLATION_PATH.COMMON + ActionEventsEnum.APPROVE,
      action: SystemParametersActionsEnum.APPROVE,
      icon: 'approve',
      keyMapAction: 'status',
      showIn: ['ACTIVE', 'PENDING'],
    },
  ];
  @Input() frozenColumn = '';
  @Input() showCheckedRow = false;
  @Input() showSearch = false;
  @Input({ required: true }) data!: T[];
  @Input({ required: true }) cols: TableHeader[] = [];
  @Input() rows = 10;
  @Input() paginator = true;
  @Input() totalRecords = 0;
  @Input() globalFilterFields: string[] = [];
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Input() sortAble = false;
  @Output() selectedItem: EventEmitter<T[]> = new EventEmitter<T[]>();
  @Output() pageChange = new EventEmitter<PaginatorState>();
  @Output() sendActionEvents = new EventEmitter<{ event: A; record: T }>();
  selectedItems: T[] = [];
  first = 0;

  onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  ngAfterViewChecked(): void {
    if (this.data.length === 0) return;
    const tableContent = (
      this.el.nativeElement as HTMLDivElement
    ).getElementsByClassName('p-datatable-wrapper');
    this.paginatorFlTableRows.next(
      tableContent[0].clientHeight < this.data.length * 48
    );
  }
}
