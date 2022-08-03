import styles from './search.module.scss';

export function Search() {

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="search">
            <h1>
              <span> Search </span>
              Moviola 📽️
            </h1>

            <div className={styles['search-input']}>
              <input className="rounded shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Search;