import ApiClient from "../util/api-client";
const movieClient = new ApiClient({ baseURL: 'http://localhost:4200/api/v1/movies' });

type RemoveResponse = {
  success: boolean;
  taskID: number;
}

export function Remove() {
  async function removeHandler() {
    const res: RemoveResponse = await movieClient.delete('/374009002');
    console.log('res', res)
  } 

  return (
    <div>
      <button
        onClick={removeHandler}
      >Remove</button>
    </div>
  )
}

export default Remove;