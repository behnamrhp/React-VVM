/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Component, ReactNode } from "react";
import IBaseVM from "@/view/i-base-vm";
import VvmConnector from "@/view/vvm-connector";

type IVMParent = Record<string, any>;
type IPropParent = Record<string, any> | undefined;

type BaseProps<IVM extends IVMParent, PROPS extends IPropParent = undefined> = {
  vm: IBaseVM<IVM>;
  restProps?: PROPS;
  /**
   * By default it's true.
   * If you pass true this view will update just by changes of vm not rest props
   *
   * @default true
   */
  memoizedByVM?: boolean;
  children?: ReactNode;
};

export type BuildProps<
  IVM extends IVMParent,
  PROPS extends IPropParent = undefined,
> = {
  vm: IVM;
  restProps: PROPS;
  children?: ReactNode;
};

export default abstract class BaseView<
  IVM extends IVMParent,
  PROPS extends IPropParent = undefined,
> extends Component<BaseProps<IVM, PROPS>> {
  protected get componentName() {
    return this.constructor.name;
  }

  protected abstract Build(props: BuildProps<IVM, PROPS>): ReactNode;

  render(): ReactNode {
    const { vm, restProps, memoizedByVM, children, ...rest } = this.props;

    VvmConnector.displayName = this.componentName;

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
