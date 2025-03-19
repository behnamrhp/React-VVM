/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, use } from "react";
import { constructor } from "@/helpers/types";

export type InjectionToken<T = any> = constructor<T> | string | symbol;

export type ReactVVMDiContainer = {
  resolve: <T>(token: InjectionToken<T>) => T;
  register: <T>(token: InjectionToken<T>, instance: T) => void;
};

const DiContext = createContext<null | ReactVVMDiContainer>(null);

const useDI = () => {
  const di = use(DiContext);

  if (!di) {
    throw new Error(
      "Di has not provided, please use ReactVVMDiProvider to provide di",
    );
  }

  return di;
};

/**
 * This is the provider for the di container.
 * You can pass your own di with ReactVVMDiContainer type and pass your vm key
 *  to view so automaticaly we get the vm and connect it to the view by that key and
 *  this di which you pass to this context.
 */
const ReactVVMDiProvider = (props: {
  /**
   * This is the container that will be used to resolve the dependencies.
   * You can pass your own di with ReactVVMDiContainer type and pass your vm key
   *  to view so automaticaly we get the vm and connect it to the view by that key and
   *  this di which you pass to this context.
   */
  diContainer: ReactVVMDiContainer;
  children: ReactNode;
}) => {
  return (
    <DiContext.Provider value={props.diContainer}>
      {props.children}
    </DiContext.Provider>
  );
};

export { ReactVVMDiProvider, useDI };
