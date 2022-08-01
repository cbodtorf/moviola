import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {

  create(body: Record<string,string>): void {
    console.log('create body', body)
    return
  }

  update(id: string, body: Record<string,string>): void {
    console.log('update id body', id, body)
    return
  }

  remove(id: string): void {
    console.log('remove id', id)
    return
  }
}
