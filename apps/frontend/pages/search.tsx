import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Hits
} from 'react-instantsearch-hooks-web';
import { SearchBox as SearchBoxCustom } from '../components/SearchBox';
import { RefinementList as RefinementListCustom } from '../components/RefinementList';
import { Pagination as PaginationCustom } from '../components/Pagination';
import { Hit } from '../components/Hit';
import styles from './search.module.scss';

export async function getStaticProps() {
  return {
    props: {
      appID: process.env.NX_ALGOLIA_APP_ID,
      apiKey: process.env.NX_ALGOLIA_PUBLIC_API_KEY,
      indexName: process.env.NX_ALGOLIA_INDEX_NAME
    }
  }
}

export function Search(props) {
  const searchClient = algoliasearch(props.appID, props.apiKey);

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="search">
            <h1>
              <span> Search </span>
              Moviola 📽️
            </h1>
          </div>

          <InstantSearch searchClient={searchClient} indexName={props.indexName}>
            <Configure hitsPerPage={8} />
            <div id="middle-content" className="search-panel">
              <div className="search-panel__filters">
                <RefinementListCustom attribute="genre" />
              </div>

              <div className="search-panel__results">
                <SearchBoxCustom />
                <Hits hitComponent={Hit} />

                <div className="pagination">
                  <PaginationCustom />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    </div>
  )
}
export default Search;