import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  readonly dialog = inject(MatDialog);

  constructor() { }

  open(component: any, info: any) {

    this.dialog.open(component, {
      data: info,
    });

  }
}
