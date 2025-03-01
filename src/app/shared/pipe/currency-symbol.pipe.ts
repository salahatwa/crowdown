import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Values } from '../interface/setting.interface';
import { PreferanceService } from '../services/preferance.service';
import { SettingState } from '../state/setting.state';

@Pipe({
  name: 'currencySymbol',
  pure: false
})
export class CurrencySymbolPipe implements PipeTransform {

  @Select(SettingState.setting) setting$: Observable<Values>;

  public symbol: string = '$';
  public setting: Values;

  constructor(private currencyPipe: CurrencyPipe, private preferanceService: PreferanceService) {
    this.setting$.subscribe(setting => this.setting = setting);
  }

  transform(value: number, position: 'before_price' | 'after_price' | string = 'before_price'): string {

    if (!value) {
      value = 0;
    };

    value = Number(value);

    if (this.preferanceService.getCurrentLang() == PreferanceService.LANG_AR) {
      this.symbol = this.setting?.general?.default_currency?.symbol_tr || this.symbol;
    }
    else {
      this.symbol = this.setting?.general?.default_currency?.symbol || this.symbol;
    }

    position = this.setting?.general?.default_currency?.symbol_position || position;

    let formattedValue = value && this.currencyPipe.transform(value?.toFixed(2), this.symbol);
    formattedValue = formattedValue && formattedValue?.replace(this.symbol, '')!;

    if (position === 'before_price') {
      return `${this.symbol} ${formattedValue}`;
    } else {
      return `${formattedValue} ${this.symbol}`;
    }
  }
}
