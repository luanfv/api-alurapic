import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NestResponse } from './nest-response';

@Injectable()
class TransformResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((responseController: NestResponse) => {
        if (responseController instanceof NestResponse) {
          const http = context.switchToHttp();
          const response = http.getResponse();
          const { headers, status, body } = responseController;

          const headersNames = Object.getOwnPropertyNames(headers);

          headersNames.forEach((name) => {
            const value = headers[name];

            this.httpAdapter.setHeader(response, name, value);
          });

          this.httpAdapter.status(response, status);

          return body;
        }

        return responseController;
      }),
    );
  }
}

export { TransformResponseInterceptor };
