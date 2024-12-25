import { Body, Controller, Post } from '@nestjs/common';
import { MovieService } from '@movie/movie.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MovieUrlDto } from '@movie/dto/movie-url.dto';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiOperation({
    summary: '영화 등록',
    description: '외부 API를 이용하여 영화 데이터를 DB에 저장',
  })
  async createMovie(@Body() dto: MovieUrlDto) {
    const { list, language, page } = dto;
    return await this.movieService.createMovie(list, language, page);
  }
}
