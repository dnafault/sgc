import { Variant } from './variant';
import { AutocompleteResult } from './autocomplete-result';
import { VariantSearchService } from '../services/variant-search-service';
import { Region } from './region';
import { SearchOption } from './search-option';
import { SearchQuery } from './search-query';
import { Position } from './position';
import { SearchFilterItem } from './search-filter-item';

export class RegionAutocomplete extends AutocompleteResult<Region> {
    search(vsal: VariantSearchService, options: SearchOption[], clinicalFilters: SearchFilterItem[]): Promise<Variant[]> {
        return vsal.getVariants(new SearchQuery(this.result.chromosome, this.result.start, this.result.end, options, clinicalFilters));
    }

    displayName(): string {
        return this.symbol;
    }

    categoryName() {
        return this.result instanceof Position ? 'Position' : 'Region';
    }

    match(query: string) {
        let queryTrimmed = query.trim();
        return this.symbol === queryTrimmed;
    }
}
