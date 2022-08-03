import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Hits,
  SearchBox,
  RefinementList,
  Pagination,
  Highlight,
} from 'react-instantsearch-hooks-web';
import styles from './search.module.scss';

export function Search() {
  const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

  function Hit(props) {
    return (
      <article>
        <h1>
          <Highlight attribute="name" hit={props.hit} />
        </h1>
        <p>
          <Highlight attribute="description" hit={props.hit} />
        </p>
      </article>
    );
  }

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

          <InstantSearch searchClient={searchClient} indexName="instant_search">
            <Configure hitsPerPage={8} />
            <div id="middle-content" className="search-panel">
              <div className="search-panel__filters">
                <RefinementList attribute="brand" />
              </div>

              <div className="search-panel__results">
                <SearchBox
                  className="searchbox"
                  placeholder=""
                />
                <Hits hitComponent={Hit} />

                <div className="pagination">
                  <Pagination />
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