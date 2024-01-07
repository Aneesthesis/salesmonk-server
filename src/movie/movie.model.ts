import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AddReviewDto } from './movie.controller';

@Schema()
export class Movie extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  releaseDate!: string;

  @Prop({ required: false, default: null })
  averageRating?: number | null;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: AddReviewDto[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  movieId: mongoose.Types.ObjectId;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
