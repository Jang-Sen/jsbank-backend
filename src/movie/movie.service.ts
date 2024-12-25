import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '@movie/entities/movie.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // 등록
  async createMovie(
    list: string,
    language: string,
    page: number,
  ): Promise<Movie[]> {
    const url = this.configService.get('MOVIE_URL');
    const movieURL = `${url}${list}?language=${language}&page=${page}`;

    const movieToken = await this.configService.get('MOVIE_TOKEN');
    const config = {
      headers: {
        Authorization: `Bearer ${movieToken}`,
      },
    };

    const { data, status } = await this.httpService
      .get(movieURL, config)
      .toPromise();

    if (status === 200) {
      const datas = data.results;
      const movieDatas = [];

      datas?.map((data) =>
        movieDatas.push({
          adult: data['adult'],
          genre_ids: data['genre_ids'],
          mid: data['id'],
          original_language: data['original_language'],
          overview: data['overview'],
          popularity: data['popularity'],
          poster_path: 'https://image.tmdb.org/t/p/w500' + data['poster_path'],
          release_date: data['release_date'],
        }),
      );

      return await this.repository.save(movieDatas);
    }
  }
}
