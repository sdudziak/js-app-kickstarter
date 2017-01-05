import 'reflect-metadata';
import { Kernel, inject, interfaces, multiInject } from 'inversify';
export { interfaces } from 'inversify';

import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';
import { makeLoggerMiddleware, textSerializer } from 'inversify-logger-middleware';
let kernel: interfaces.Kernel = new Kernel();

if (process.env.NODE_ENV === 'development') {
    let logger = makeLoggerMiddleware(null, (entry) => console.log(textSerializer(entry)));
    kernel.applyMiddleware(logger);
}

let provide = makeProvideDecorator(kernel);
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

let provideTaggedSingleton = function (identifier: any, tag: string, value: any) {
    return fluentProvider(identifier)
        .inSingletonScope()
        .whenTargetTagged(tag, value)
        .done();
};

export {
    kernel,
    autoProvide,
    provide,
    provideNamed,
    inject,
    multiInject,
    provideSingleton,
    provideNamedSingleton,
    provideTaggedSingleton
};
