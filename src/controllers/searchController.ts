import { JsonController, Get } from 'routing-controllers';
import Container from 'typedi';

import { SearchService } from '@/services/searchService';

@JsonController('/search')
export class dataHandlerController {
  private searchServiceI = Container.get(SearchService);

  @Get('/brute-force-search')
  bruteForceSearch() {
    this.searchServiceI.bruteForceSearch();
    return 'Brute Force Search';
  }
}
