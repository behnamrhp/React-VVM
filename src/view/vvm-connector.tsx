/* eslint-disable @typescript-eslint/no-explicit-any */
import IBaseVM from "@/view/i-base-vm";
import { FC, memo, PropsWithChildren } from "react";

interface IVvmConnector<IVM, PROPS> extends PropsWithChildren {
  View: FC<any & { vm: IVM }>;
  Vm: IBaseVM<IVM>;
  restProps?: PROPS;
  memoizedByVM?: boolean;
}
/**
 * This function is just will be used in base view to connect vm to view
 * It decides if the view should be memoized by vm or not.
 * Also it calls vm.useVM() and passes vm to the view
 */
const VvmConnector = memo(
  <IVM, PROPS>(props: IVvmConnector<IVM, PROPS>) => {
    const { View, Vm, restProps, children } = props;

    const vm = Vm.useVM();

    const allProps = {
      restProps,
      vm,
    };

    return <View {...allProps}>{children}</View>;
  },
  (prevProps) => {
    if (prevProps.memoizedByVM) return true;
    return false;
  },
);

export default VvmConnector;
