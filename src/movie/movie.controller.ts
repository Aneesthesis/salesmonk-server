import { Controller, Get, Post, Headers, Param, Body } from '@nestjs/common';
import { MovieService } from './movie.service';

// review.dto.ts
export class AddReviewDto {
  movieId: string;
  reviewerName: string;
  rating: number;
  comments: string;
}

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

  @Get('/movies/:id/reviews')
  async reviewList(@Headers() headers: Record<string, string>) {
    try {
      const reviews = await this.movieService.findAllReviews();
      return { reviews };
    } catch (error) {
      console.error(
        'Error while fetching all reviews:',
        (error as Error).message,
      );

      return { status: 403, error };
    }
  }

  @Post('/reviews')
  async addReview(
    @Headers() headers: Record<string, string>,
    @Body() reviewData: AddReviewDto,
  ) {
    try {
      const newReview = await this.movieService.addReviewToMovie(
        reviewData.movieId,
        reviewData.reviewerName,
        reviewData.rating,
        reviewData.comments,
      );

      return { review: newReview };
    } catch (error) {
      console.error('Error while adding a review:', (error as Error).message);

      return { status: 403, error };
    }
  }
}
