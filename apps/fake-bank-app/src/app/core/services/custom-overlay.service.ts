import { Injectable, Injector } from '@angular/core';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import {
  Overlay,
  OverlayConfig,
  ConnectionPositionPair
} from '@angular/cdk/overlay';

import { CustomOverlayRef, OverlayContent } from '../custom-overlay-ref';

import {
  overlayTop,
  overlayRight,
  overlayBottom,
  overlayLeft
} from '../constants';
import { CustomOverlayComponent } from '../custom-overlay/custom-overlay.component';
import { CoreModule } from '@fake-bank/core/core.module';

export interface OverlayOptions<T> {
  origin: HTMLElement;
  content: OverlayContent;
  data?: T;
  width?: number | string;
  height?: number | string;
}

@Injectable()
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
