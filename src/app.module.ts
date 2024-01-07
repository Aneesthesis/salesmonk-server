import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MovieModule, ReviewModule, DatabaseModule],
})
export class AppModule {}
