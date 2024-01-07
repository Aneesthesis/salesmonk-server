import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Movie } from '../movie/movie.model';

@Schema()
export class Review extends Document {
  @Prop({ type: String, required: true })
  movieId!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true })
  movie: Movie;

  @Prop({ required: false })
  reviewerName?: string;

  @Prop({ required: true, min: 1, max: 10 })
  rating!: number;

  @Prop({ required: true })
  reviewComments!: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
