import { Module } from '@nestjs/common';
import { SparqlService } from './services';

@Module({
  providers: [SparqlService],
  exports: [SparqlService],
})
export class SparqlModule {}
