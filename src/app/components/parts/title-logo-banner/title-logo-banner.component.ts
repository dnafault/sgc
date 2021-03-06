import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-title-logo-banner',
    templateUrl: './title-logo-banner.component.html',
    styleUrls: ['./title-logo-banner.component.css']
})
export class TitleLogoBannerComponent implements OnInit {
    title = 'SYDNEY GENOMICS COLLABORATIVE';
    subtitle = 'TRANSLATING GENOMICS RESEARCH INTO BETTER HEALTH OUTCOMES';

    constructor() {
    }

    ngOnInit() {
    }
}
