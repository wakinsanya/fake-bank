import { TemplateRef, Component } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export interface OverlayCloseEvent<T> {
  data: T;
  action: OverlayCloseAction;
}

type OverlayCloseAction = 'closeClick' | 'backdropClick';

export type OverlayContent = Component | TemplateRef<any> | string;

export class CustomOverlayRef<T = any> {
  private afterClosedAction$ = new Subject<OverlayCloseEvent<T>>();
  afterClosedActionObs$ = this.afterClosedAction$.asObservable();

  constructor(
    public data: T,
    public overlayRef: OverlayRef,
    public content: OverlayContent
  ) {
    overlayRef.backdropClick().subscribe({
      next: () => {
        this._close('backdropClick', data);
      }
    });
  }

  close(data?: T) {
    this._close('closeClick', data);
  }

  private _close(action: OverlayCloseAction, data: T) {
    this.overlayRef.dispose();
    this.afterClosedAction$.next({
      data,
      action
    });
    this.afterClosedAction$.complete();
  }
}
