/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDI, type InjectionToken } from "@/view/di-ctx";
import IBaseVM from "@/view/i-base-vm";
import VvmConnector from "@/view/vvm-connector";
import BaseVM from "@/vm/base-vm";
import { Component, ReactNode } from "react";

type IVMParent = Record<string, any>;
type IPropParent = Record<string, any> | undefined;

type BaseProps<PROPS extends IPropParent = undefined> = {
  restProps?: PROPS;
  /**
   * By default it's true.
   * If you pass true this view will update just by changes of vm not rest props
   *
   */
  memoizedByVM?: boolean;
  children?: ReactNode;
};

type BasePropsWithVM<
  IVM extends IVMParent,
  PROPS extends IPropParent = undefined,
> = BaseProps<PROPS> & {
  /**
   * Directly instantiated vm
   */
  vm: IBaseVM<IVM>;
};

type BasePropsWithVMKey<
  IVM extends IVMParent,
  PROPS extends IPropParent = undefined,
> = BaseProps<PROPS> & {
  /**
   * TSyringe key for vm to be injected
   */
  vmKey: InjectionToken;
  /**
   * Use this callback to modify your vm after getting from di and before sending to the view.
   * You can use it when you have dynamic vm with dependencies.
   * @param vm - Vm that was resolved from DI container using `vmKey`
   * @returns vm - modified VM or the same
   */
  modifiedVm?: (vm: BaseVM<IVM, any>) => BaseVM<IVM, any>;
};

export type BuildProps<
  IVM extends IVMParent,
  PROPS extends IPropParent = undefined,
> = {
  vm: IVM;
  restProps: PROPS;
  children?: ReactNode;
};

export type ViewProps<
  IVM extends IVMParent,
  PROPS extends IPropParent = undefined,
> = BasePropsWithVM<IVM, PROPS> | BasePropsWithVMKey<IVM, PROPS>;

/**
 * Base view is base component for all views in mvvm architecture which gets
 *  vm as props and connect it to the view and memoize the component by default
 *  to just render just on changes of its vm.
 */
export default abstract class BaseView<
  IVM extends IVMParent,
  PROPS extends IPropParent = undefined,
> extends Component<ViewProps<IVM, PROPS>> {
  private vm: IBaseVM<IVM> | undefined;

  constructor(props: ViewProps<IVM, PROPS>) {
    super(props);
    this.vm = this.initVm;
  }

  private get initVm() {
    if (Object.hasOwn(this.props, "vmKey")) {
      const { vmKey, modifiedVm } = this.props as BasePropsWithVMKey<
        IVM,
        PROPS
      >;
      const di = useDI();
      const vmByDi = di.resolve(vmKey) as BaseVM<IVM>;
      if (modifiedVm) {
        return modifiedVm(vmByDi);
      }
      return vmByDi;
    }
    return (this.props as BasePropsWithVM<IVM, PROPS>).vm;
  }

  protected get componentName() {
    return this.constructor.name;
  }

  protected abstract Build(props: BuildProps<IVM, PROPS>): ReactNode;

  render(): ReactNode {
    const { restProps, memoizedByVM, children, ...rest } = this.props;
    VvmConnector.displayName = this.componentName;
    const vm = memoizedByVM ? this.vm : this.initVm;
    if (!vm) {
      const isVmKey = Object.hasOwn(this.props, "vmKey");
      const message = isVmKey
        ? "vm is not defined, please check your di configuration with ReactVVMDiProvider or pass correct vmKey"
        : "pass correct vm to the view";
      throw new Error(`Vm is not defined, ${message}`);
    }

    return (
      <VvmConnector
        View={this.Build}
        Vm={vm}
        memoizedByVM={typeof memoizedByVM === "undefined" ? true : memoizedByVM}
        restProps={{ ...restProps, ...rest }}
      >
        {children}
      </VvmConnector>
    );
  }
}
