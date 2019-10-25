import { Component, OnInit, TemplateRef } from '@angular/core';
import { CustomOverlayService } from '../services/custom-overlay.service';

@Component({
  selector: 'fake-bank-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private customOverlayService: CustomOverlayService) {}

  ngOnInit() {}

  testCustomOverlay(el: HTMLElement, content: TemplateRef<any>) {
    this.customOverlayService.open({
      origin: el,
      width: '200px',
      height: '200px',
      content
    });
  }
}
