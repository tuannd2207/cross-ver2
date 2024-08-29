import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '@app/app.enum';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private translateService = inject(TranslateService);

  constructor() {
    this.translateService.setDefaultLang(Lang.vi);
    // Use a specific language
    this.translateService.use(Lang.vi);
  }
  setLanguage(lang: Lang) {
    this.translateService.use(lang);
  }
}
