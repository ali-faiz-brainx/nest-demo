import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { AbcService } from './abc/abc.service';
import { AbcController } from './abc/abc.controller';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 3 },
      { name: 'medium', ttl: 60000, limit: 100 },
    ]),
    OrdersModule,
    ProductsModule,
  ],
  controllers: [AppController, AbcController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }, AbcService],
})
export class AppModule {}
