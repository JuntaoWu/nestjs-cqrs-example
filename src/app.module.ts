import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
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
  }), PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
