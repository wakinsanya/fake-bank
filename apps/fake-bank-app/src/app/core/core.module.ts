import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { HeaderComponent } from './header/header.component';
import { CustomOverlayComponent } from './custom-overlay/custom-overlay.component';
import { CustomOverlayService } from './services/custom-overlay.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { UsersService } from './services/users.service';
import { SavingsAccountService } from './services/savings-account.service';
import { CurrentAccountService } from './services/current-account.service';

@NgModule({
  declarations: [HeaderComponent, CustomOverlayComponent],
  imports: [CommonModule, OverlayModule],
  exports: [HeaderComponent],
  entryComponents: [CustomOverlayComponent],
  providers: [CustomOverlayService, UsersService, SavingsAccountService, CurrentAccountService]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
