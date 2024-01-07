import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ required: true })
  movieId: string;

  @Prop()
  reviewerName?: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  comments: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
