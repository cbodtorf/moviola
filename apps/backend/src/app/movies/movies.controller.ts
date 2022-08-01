import { Body, Controller, Delete, HttpCode, Param, Post, Put } from '@nestjs/common';

import { MoviesService } from './movies.service';

@Controller({
  version: '1',
})
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @HttpCode(204)
  create(@Body() body: Record<string,string>) {
    return this.moviesService.create(body);
  }

  @Put(':id')
  @HttpCode(204)
  update(
    @Param('id') id: string,
    @Body() body: Record<string,string>
  ) {
    return this.moviesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
