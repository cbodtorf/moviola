import ApiClient from "../util/api-client";
const movieClient = new ApiClient({ baseURL: 'http://localhost:4200/api/v1/movies' });

export function Update() {
  function updateHandler() {
    movieClient.put('/123', {
      movie: {
        title: 'Action Leauge Now'
      }
    });
  } 

  return (
    <div>
      <button
        onClick={updateHandler}
      >Update</button>
    </div>
  )
}

export default Update;