import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NAV_SECTIONS, NAV_LINKS, ROLE_ADMIN } from '../../shared/configuration/pages';




@Injectable({
    providedIn: 'root',
})

export class RouterService {

    isDroped = false;
    icon = 'arrow_drop_down';
  
  
    get navSection() {
      return NAV_SECTIONS[this.currentSection];
    }
    get navLinks() {
      return NAV_LINKS;
    }
  
    get currentSection() {
      return ROLE_ADMIN;
    }

    _isDroped() {
        this.isDroped = !this.isDroped;
        // tslint:disable-next-line:no-non-null-assertion
        if ( this.isDroped! ) {
          this.icon = 'arrow_drop_up';
        } else {
          this.icon = 'arrow_drop_down';
        }
      }
}
