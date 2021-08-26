import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { PersonSnapshotModule } from './person-snapshot/person-snapshot.module';
import { SalaryStandardModule } from './salary-standard/salary-standard.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AggregateRepository } from 'services/aggregate.repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const connectionOptions = await getConnectionOptions();
        return Object.assign(connectionOptions, {
          host: process.env.MYSQL_HOST,
          port: +process.env.MYSQL_PORT,
          username: process.env.MYSQL_USERNAME,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
          synchronize: true,
          autoLoadEntities: true,
          logging: process.env.MYSQL_LOGGING === "true"
        })
      }
    }), PersonModule, PersonSnapshotModule, SalaryStandardModule],
  controllers: [AppController],
  providers: [AppService, AggregateRepository],
})
export class AppModule { }
