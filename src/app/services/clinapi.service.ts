import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { VariantTrackService } from './genome-browser/variant-track-service';
import { FAKE_CLINICAL_DATA } from '../mocks/clindata';
import { VariantSearchService } from './variant-search-service';
import * as seedrandom from 'seedrandom';

@Injectable()
export class ClinapiService {
    samples = [];
    samplesGroup: any;
    changes = new Subject();
    constructor(private vss: VariantSearchService,
                private vts: VariantTrackService) {
        this.changes.debounceTime(300).subscribe(v => {
            this.samples = this.samplesGroup.all().filter(s => s.value > 0).map(s => s.key);


            const loc = {
                from: this.vss.startingRegion.start,
                to: this.vss.startingRegion.end,
            };

            vts.track.data().call(vts.track, {
                'loc' : loc,
                'on_success' : () => {
                    const filtered = this.filterVariants(vts.data.elements(), this.samples);
                    vts.data.elements(filtered);
                    vts.track.display().update.call(vts.track, loc);
                }
            });
        });
    }

    getPatients(demo = false): Observable<any> {
        if (demo) {
            return Observable.of<any>(FAKE_CLINICAL_DATA);
        } else {
            return Observable.throw({status: 401})
        }
    }

    filterVariants(v: any[], s: any[]) {
        if (s.length >= 1139) {
            return v;
        } else if (s.length === 0) {
            return [];
        }
        const rng = seedrandom(s.join(""));
        const p = (s.length / 1139.0) + 0.025;
        const vf = [];
        for (let i = 0; i < v.length; i++) {
            if (rng() < p ) {
                vf.push(v[i])
            }
        }
        return vf;
    }

}
