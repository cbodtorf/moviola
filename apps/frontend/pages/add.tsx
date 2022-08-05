import ApiClient from "../util/api-client";
const movieClient = new ApiClient({ baseURL: 'http://localhost:4200/api/v1/movies' });

type AddResponse = {
  objectID: string;
  success: boolean;
  taskID: number;
}

export function Add() {
  async function addHandler() {
    const res: AddResponse = await movieClient.post('/', {
      movie: {
        title: 'Action Leauge Now'
      }
    });
    console.log('res', res)
  } 

  return (
    <div>
      <button
        onClick={addHandler}
      >Add</button>
    </div>
  )
}

export default Add;