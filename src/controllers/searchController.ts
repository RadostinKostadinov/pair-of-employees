import { JsonController, Get, Authorized } from 'routing-controllers';
import Container from 'typedi';

import { SearchService } from '@/services/searchService';

@JsonController('/search')
@Authorized()
export class searchController {
  private searchServiceI = Container.get(SearchService);

  @Get('/brute-force-search')
  bruteForceSearch() {
    const result = this.searchServiceI.bruteForceSearch();
    return result;
  }
}
