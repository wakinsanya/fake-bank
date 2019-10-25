import { Component, OnInit, TemplateRef } from '@angular/core';
import { OverlayContent, CustomOverlayRef } from '../custom-overlay-ref';
import {  OverlayRenderContext } from './overlay-render-context.enum';

@Component({
  selector: 'fake-bank-custom-overlay',
  templateUrl: './custom-overlay.component.html',
  styleUrls: ['./custom-overlay.component.scss']
})
export class CustomOverlayComponent implements OnInit {
  context: any;
  content: OverlayContent;
  renderContext: 'component' | 'template' | 'text' = 'component';

  constructor(private customOverlayRef: CustomOverlayRef) {}

  ngOnInit() {
    this.content = this.customOverlayRef.content;
    if (this.content instanceof TemplateRef) {
      this.renderContext = OverlayRenderContext.TEMPLATE;
      this.context = {
        close: this.customOverlayRef.close.bind(this.customOverlayRef)
      };
    } else if (typeof this.content === 'string') {
      this.renderContext = OverlayRenderContext.TEXT;
    } else if (this.renderContext !== 'component') {
      throw new Error('Unknown overlay render context!');
    }
  }
}
