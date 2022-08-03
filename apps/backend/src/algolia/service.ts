import algoliasearch, { SearchClient, SearchIndex } from "algoliasearch";
export class AlgoliaService {
  public client: SearchClient;
  public index: SearchIndex;

  constructor (
    private appId: string,
    private adminKey: string,
    private indexName: string
  ) {
    this.client = algoliasearch(this.appId, this.adminKey);
    this.index = this.client.initIndex(this.indexName);
  }
}