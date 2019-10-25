import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import {
  Overlay,
  OverlayConfig,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
// TODO
// import { CustomOverlayRef } from '../custom-overlay-ref';
// TODO
// import { CustomOverlayComponent } from '../components/custom-overlay/custom-overlay.component';
import {
  overlayTop,
  overlayRight,
  overlayBottom,
  overlayLeft
} from '../constants';

export interface OverlayOptions<T> {
  origin: HTMLElement;
  content: TemplateRef<any> | Type<any> | string;
  data?: T;
  width?: number | string;
  height?: number | string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomOverlayService {
  constructor(private injector: Injector, private overlay: Overlay) {
    this.connectionPositionPairs = [
      overlayTop as ConnectionPositionPair,
      overlayRight as ConnectionPositionPair,
      overlayBottom as ConnectionPositionPair,
      overlayLeft as ConnectionPositionPair
    ];
  }

  private connectionPositionPairs: ConnectionPositionPair[] = [];

  open<T>({
    origin,
    data,
    width,
    height,
    content
  }: OverlayOptions<T>): CustomOverlayRef {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions(this.connectionPositionPairs)
      .withPush(false);
    const overlayRef = this.overlay.create(
      new OverlayConfig({
        width,
        height,
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.reposition()
      })
    );
    const customOverlayRef = new CustomOverlayRef<T>(data, overlayRef, content);
    overlayRef.attach(
      new ComponentPortal(
        CustomOverlayComponent,
        null,
        new PortalInjector(
          this.injector,
          new WeakMap([[CustomOverlayRef, customOverlayRef]])
        )
      )
    );
    return customOverlayRef;
  }
}
