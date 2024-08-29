import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageJwtService {
  getItem(): Observable<string | null> {
    const data = localStorage.getItem('jwtToken');
    if (data) {
      return of(data);
    }
    return of(null);
  }

  setItem(data: string): Observable<string> {
    localStorage.setItem('jwtToken', data);
    return of(data);
  }

  removeItem(): void {
    localStorage.clear();
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  public setExpireDateRefreshToken(time: number): void {
    localStorage.setItem('refresh__expireDate', String(time));
  }

  public setExpireDateToken(time: number): void {
    localStorage.setItem('token_expiration', String(time));
  }

  public getIsExpireDateRefreshToken(): boolean {
    const dateNow = new Date().getTime();
    return dateNow > Number(localStorage.getItem('refresh__expireDate'));
  }

  public getIsExpireDateToken(): boolean {
    const dateNow = new Date().getTime();
    return dateNow > Number(localStorage.getItem('token_expiration'));
  }
}
