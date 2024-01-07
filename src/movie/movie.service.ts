import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movie.model';
import { Review } from 'src/review/review.model';
import { AddReviewDto } from './movie.controller';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {}

  async addMovie(name: string, releaseDate: string): Promise<Movie> {
    const movie = new this.movieModel({ name, releaseDate });
    return await movie.save();
  }

  async findMovieById(movieId: string): Promise<Movie | null> {
    try {
      const movie = await this.movieModel.findById(movieId).exec();
      return movie;
    } catch (error) {
      console.error(
        'Error while finding a movie by ID:',
        (error as Error).message,
      );
      throw new NotFoundException('Movie not found');
    }
  }

  async findAllMovies(): Promise<Movie[]> {
    try {
      const movies = await this.movieModel.find().exec();
      return movies;
    } catch (error) {
      console.error(
        'Error while finding all movies:',
        (error as Error).message,
      );
      throw error;
    }
  }

  async findAllReviews(): Promise<Review[]> {
    try {
      const movies = await this.movieModel.find().populate('reviews').exec();
      const allReviews = movies.flatMap((movie) => movie.reviews);
      return allReviews;
    } catch (error) {
      console.error(
        'Error while finding all reviews:',
        (error as Error).message,
      );
      throw error;
    }
  }

  async addReviewToMovie(
    movieId: string,
    reviewerName: string,
    rating: number,
    comments: string,
  ): Promise<Movie | null> {
    try {
      const movie = await this.movieModel.findById(movieId).exec();

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }

      const newReview: AddReviewDto = {
        movieId,
        reviewerName,
        rating,
        comments,
      };

      movie.reviews.push(newReview);
      await movie.save();

      return movie;
    } catch (error) {
      console.error(
        'Error while adding a review to the movie:',
        (error as Error).message,
      );
      throw error;
    }
  }
}
