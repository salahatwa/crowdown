import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select2Module } from 'ng-select2-component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguagesComponent } from './components/header/widgets/languages/languages.component';
import { SearchComponent } from './components/header/widgets/search/search.component';
import { ContentComponent } from './components/layout/content/content.component';
import { FullComponent } from './components/layout/full/full.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// UI
import { ModeComponent } from './components/header/widgets/mode/mode.component';
import { NotificationComponent } from './components/header/widgets/notification/notification.component';
import { ProfileComponent } from './components/header/widgets/profile/profile.component';
import { AdvancedDropdownComponent } from './components/ui/advanced-dropdown/advanced-dropdown.component';
import { DropdownListComponent } from './components/ui/advanced-dropdown/dropdown-list/dropdown-list.component';
import { AlertComponent } from './components/ui/alert/alert.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { FeatherIconsComponent } from './components/ui/feather-icons/feather-icons.component';
import { FileUploadComponent } from './components/ui/file-upload/file-upload.component';
import { FormFieldsComponent } from './components/ui/form-fields/form-fields.component';
import { LinkComponent } from './components/ui/link/link.component';
import { MediaBoxComponent } from './components/ui/media-box/media-box.component';
import { NoDataComponent } from './components/ui/no-data/no-data.component';
import { PaginationComponent } from './components/ui/pagination/pagination.component';
import { AddtocartComponent } from './components/ui/product-box/modal/addtocart/addtocart.component';
import { ProductBoxComponent } from './components/ui/product-box/product-box.component';
import { ProductBoxSkeletonComponent } from './components/ui/skeleton/product-box-skeleton/product-box-skeleton.component';
import { SidebarMenuSkeletonComponent } from './components/ui/skeleton/sidebar-menu-skeleton/sidebar-menu-skeleton.component';
import { TableComponent } from './components/ui/table/table.component';

// Modal Components
import { ConfirmationModalComponent } from './components/ui/modal/confirmation-modal/confirmation-modal.component';
import { DeleteModalComponent } from './components/ui/modal/delete-modal/delete-modal.component';
import { ImportCsvModalComponent } from './components/ui/modal/import-csv-modal/import-csv-modal.component';
import { MediaModalComponent } from './components/ui/modal/media-modal/media-modal.component';
import { PayoutModalComponent } from './components/ui/modal/payout-modal/payout-modal.component';

// Directives
import { HasPermissionDirective } from './directive/has-permission.directive';
import { NumberDirective } from './directive/numbers-only.directive';
import { ClickOutsideDirective } from './directive/out-side-directive';

// Pipes
import { FilterComponent } from './components/ui/table/filter/filter.component';
import { CurrencySymbolPipe } from './pipe/currency-symbol.pipe';
import { MediaPipe } from './pipe/media.pipe';
import { RolePipe } from './pipe/role.pipe';
import { SummaryPipe } from './pipe/summary.pipe';
import { SecurePipe } from './pipe/secure.pipe';
import { AutocompleteOffDirective } from './directive/auto-complete-off.directive';

@NgModule({
  declarations: [
    // Components
    ContentComponent,
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    FullComponent,
    FooterComponent,
    PageWrapperComponent,
    SearchComponent,
    LanguagesComponent,
    // UI Components
    FeatherIconsComponent,
    AlertComponent,
    TableComponent,
    FilterComponent,
    PaginationComponent,
    FormFieldsComponent,
    FileUploadComponent,
    AdvancedDropdownComponent,
    DropdownListComponent,
    MediaBoxComponent,
    ButtonComponent,
    NoDataComponent,
    ProductBoxSkeletonComponent,
    ProductBoxComponent,
    AddtocartComponent,
    NotificationComponent,
    ProfileComponent,
    ModeComponent,
    SidebarMenuSkeletonComponent,
    LinkComponent,
    // Modal Components
    DeleteModalComponent,
    MediaModalComponent,
    ConfirmationModalComponent,
    PayoutModalComponent,
    ImportCsvModalComponent,
    // Directives
    ClickOutsideDirective,
    AutocompleteOffDirective,
    NumberDirective,
    CurrencySymbolPipe,
    MediaPipe,
    HasPermissionDirective,
    // Pipes
    SummaryPipe,
    SecurePipe,
    RolePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    Select2Module,
    NgxDropzoneModule,
    CarouselModule,
    TranslateModule,
    DragDropModule
  ],
  providers: [CurrencyPipe],
  exports: [
    // Modules
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    Select2Module,
    CarouselModule,
    TranslateModule,
    FilterComponent,
    // Components
    FeatherIconsComponent,
    AlertComponent,
    TableComponent,
    DragDropModule,
    PaginationComponent,
    FormFieldsComponent,
    FileUploadComponent,
    PageWrapperComponent,
    LoaderComponent,
    AdvancedDropdownComponent,
    NoDataComponent,
    ProductBoxSkeletonComponent,
    ProductBoxComponent,
    AddtocartComponent,
    LinkComponent,
    ButtonComponent,
    MediaBoxComponent,
    // Modals
    DeleteModalComponent,
    MediaModalComponent,
    ConfirmationModalComponent,
    PayoutModalComponent,
    ImportCsvModalComponent,
    // Directives
    NumberDirective,
    AutocompleteOffDirective,
    HasPermissionDirective,
    // Pipes
    CurrencySymbolPipe,
    SummaryPipe,
    SecurePipe,
    RolePipe,
    MediaPipe
  ]
})
export class SharedModule { }
