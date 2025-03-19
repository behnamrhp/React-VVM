/* eslint-disable @typescript-eslint/no-explicit-any */
declare const _: unique symbol;

export type constructor<T> = {
  new (...args: any[]): T;
};

type Forbidden = { [_]: typeof _ };

/**
 * You can use this type to make your parent class method forbidden to overwrite
 */
export type NoOverride<T = void> = T & Forbidden;
