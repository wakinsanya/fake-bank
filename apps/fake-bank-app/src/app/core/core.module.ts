import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomOverlayComponent } from './custom-overlay/custom-overlay.component';
import { CustomOverlayService } from './services/custom-overlay.service';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [HeaderComponent, CustomOverlayComponent],
  imports: [CommonModule, MatToolbarModule, OverlayModule],
  exports: [HeaderComponent],
  entryComponents: [CustomOverlayComponent],
  providers: [CustomOverlayService]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
