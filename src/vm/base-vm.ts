"use client";

import { NoOverride } from "@/helpers/types";
import { useDI } from "@/view/di-ctx";
import IBaseVM from "@/view/i-base-vm";
import { useState } from "react";

/**
 * Base class for all viewmodels. It provides
 *  - dependency injection: To get closes di which serves from di provider
 *  - rerender method: to rerender your component manually
 *  - produce method: to produce your vm dynamically by passing and attaching dependencies to it
 */
export default abstract class BaseVM<
  /**
   * Your vm type
   */
  IVM,
  /**
   * Your dependencies type which will be passed to the vm and vm needs them to work with
   */
  DEP extends object | undefined = undefined,
> implements IBaseVM<IVM>
{
  abstract useVM(): IVM;

  protected deps!: DEP;

  produce(dep?: DEP) {
    if (dep) this.deps = dep;

    return this;
  }

  protected get di() {
    return useDI();
  }

  /**
   * You can use this hook in your useVm method to get rerender method
   * @returns Rerender Method that when ever you call it you can rerender your component
   *  for showing new values
   */
  protected useRerender(): NoOverride<() => void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, reState] = useState(false);

    const rerender = () => reState((prev) => !prev);
    return rerender as NoOverride<() => void>;
  }
}
