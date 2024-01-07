// admin.controller.ts
import {
  Controller,
  Get,
  Post,
  Headers,
  Put,
  Param,
  InternalServerErrorException,
  Body,
} from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('/api/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  async moviesList(@Headers() headers: Record<string, string>) {
    try {
      const movies = await this.movieService.findAllMovies();
      return { movies };
    } catch (error) {
      console.error(
        'Error while fetching all movies:',
        (error as Error).message,
      );

      return { status: 403, error };
    }
  }
  @Post('/')
  async addMovie(
    @Headers() headers: Record<string, string>,
    @Body() movieData: any,
  ) {
    try {
      const newMovie = await this.movieService.addMovie(
        movieData.name,
        movieData.releaseDate,
      );

      return { movie: newMovie };
    } catch (error) {
      console.error('Error while adding a movie:', (error as Error).message);

      return { status: 403, error };
    }
  }

  @Get('/movies/:id')
  async user(@Param('id') movieId: string) {
    try {
      const movie = await this.movieService.findMovieById(movieId);
      return { movie };
    } catch (error) {
      console.error('Error while fetching movie:', (error as Error).message);
      return { error };
    }
  }

  //   @Put('/movies/:userId/toggleBlock')
  //   async toggleBlock(
  //     @Param('userId') userId: string,
  //     @Headers() headers: Record<string, string>,
  //   ) {
  //     try {
  //       const authorizationToken = JSON.stringify(headers.authorization);
  //       const updatedUser = await this.userService.toggleBlocking(
  //         userId,
  //         authorizationToken,
  //       );
  //       if (updatedUser) {
  //         return {
  //           success: true,
  //           message: 'User blocking toggled successfully',
  //           updatedUser,
  //         };
  //       } else {
  //         return { success: false, message: 'User not found' };
  //       }
  //     } catch (error) {
  //       console.error('Error while toggling blocking for user:');
  //       throw new InternalServerErrorException('Error toggling user blocking');
  //     }
  //   }
}
