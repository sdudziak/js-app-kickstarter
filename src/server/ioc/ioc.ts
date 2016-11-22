import 'reflect-metadata';
import { Kernel, inject, interfaces, multiInject } from 'inversify';
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';

let kernel: interfaces.Kernel = new Kernel();

if (process.env.NODE_ENV === 'development') {
    let logger = makeLoggerMiddleware();
    kernel.applyMiddleware(logger);
}

let provide        = makeProvideDecorator(kernel);
let fluentProvider = makeFluentProvideDecorator(kernel);

let provideNamed = function (identifier: any, name: string) {
    return fluentProvider(identifier)
        .whenTargetNamed(name)
        .done();
};

let provideSingleton = function (identifier: any) {
    return fluentProvider(identifier)
        .inSingletonScope()
        .done();
};

let provideNamedSingleton = function (identifier: any, name: string) {
    return fluentProvider(identifier)
        .inSingletonScope()
        .whenTargetNamed(name)
        .done();
};

export { kernel, autoProvide, provide, provideNamed, inject, multiInject, provideSingleton, provideNamedSingleton };
