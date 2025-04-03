# React vvm

## Table of contents
- [React vvm](#react-vvm)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
  - [Motivation](#motivation)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [IVM (Interface ViewModel)](#ivm-interface-viewmodel)
    - [View](#view)
    - [VM - ViewModel](#vm---viewmodel)
    - [Connection](#connection)
  - [Memoization by vm](#memoization-by-vm)
  - [Dynamic VMs](#dynamic-vms)
  - [Usage with di](#usage-with-di)
  - [All Apis](#all-apis)
    - [BaseView](#baseview)
    - [BaseVM](#basevm)
## Overview
This library provides a simple, efficient, and reliable solution for MVVM (Model-View-ViewModel) pattern in React applications. It establishes a shared language for robust architectural coding by combining the MVVM architecture with the Bridge pattern, creating a solid foundation for UI development that maximizes maintainability, testability, and reusability.

By explicitly defining ViewModels as the UI logic layer for each view, the library effectively prevents unnecessary re-renders that would otherwise propagate from parent components.

## Motivation
In an era where most frontend communities—particularly the React ecosystem—focus on discussing new tools, libraries, and immediate development solutions, architectural patterns and software engineering fundamentals often receive less attention. However, in professional software engineering, maintainability, testability, and reusability remain the foundational pillars that every developer should prioritize.

Managing UI components and their associated logic—particularly regarding reusability, maintainability, and testability—remains one of the most persistent challenges for frontend engineers. Finding optimal solutions in this domain continues to be a primary focus of the field.

Among the various architectural patterns available for frontend development, MVVM (Model-View-ViewModel) stands out as one of the most practical and reliable approaches. While this pattern has been successfully implemented across numerous frameworks and libraries, I noticed a significant gap in the React ecosystem - the absence of a well-designed MVVM solution that properly adapts to React's unique environment and capabilities.

These considerations led me to create this library - to establish a foundational implementation and shared architectural language for React developers who value proper application structure.

For deeper insights into the library's design philosophy, MVVM architecture, and relevant design patterns, I recommend these articles:

[Cracking the Code: How the MVVM with Bridge Pattern Saves a Messy Frontend UI (Part 1)](https://dev.to/behnamrhp/cracking-the-code-how-the-mvvm-with-bridge-pattern-saves-a-messy-frontend-ui-part-1-3h4)

[Cracking the Code: How the MVVM with Bridge Pattern Saves a Messy Frontend UI (Part 2)](https://dev.to/behnamrhp/cracking-the-code-how-the-mvvm-with-bridge-pattern-saves-a-messy-frontend-ui-part-2-22oc)

## Getting Started

### Installation
npm
```
npm install reactvvm
```

yarn
```
yarn add reactvvm
```

pnpm
```
pnpm install reactvvm
```
### IVM (Interface ViewModel)
The IVM serves as the foundational bridge between UI components and their business logic. This interface explicitly defines the requirements that a View needs from its UI logic to properly render and function.

Example for a button.

```ts
// views/button/button-vm.interface.ts

export default interface ButtonVm {
  props: {
    title: string
    disabled: boolean
  },
  onClick(): void
}
```
> Note: Based on best practices, since this interface serves as the dedicated bridge for a specific view, it should be located with its corresponding view component in the same directory.

### View
The View is a component that:

- Declares its requirements from the ViewModel through a clear interface

- May receive dependencies via props from parent components

- Maintains strict separation between:

  - Parent-provided dependencies

  - Its own UI logic and state management

**Key Principle:**
All UI logic should be encapsulated within the ViewModel, while the View remains focused solely on presentation.

In typical MVVM implementations, Views should primarily re-render only when their ViewModel (VM) changes, not when parent components update. To achieve this goal, Views by default are memoized to prevent unnecessary parent-triggered re-renders.

Also rendering isolation ensures Views only update when their VM changes

To handle these memoization and connection between view and vm, and passing props based on it's ivm, we made a BaseView which handles all these reusable logics and just needed to specify the component in reusable `build` method where you can get your vm and rest of props from parent components.

```tsx
// views/button/button.ts
export default class Button extends BaseView<ButtonVm, { className?: string }> {
  protected Build(
    props: BuildProps<ButtonVm, { className?: string }>,
  ): ReactNode {
    const { vm, restProps } = props;
    const { className } = restProps;
    return (
      <ButtonUi
        className={className}
        disabled={vm.props.disabled}
        onClick={vm.onClick}
      >
        {vm.props.title}
      </ButtonUi>
    );
  }
}
```

In this example parent components control only visual styling based on specific context by (className).

ViewModel handles all ui logic and connection to the logical layer.

In this architecture, the Button component serves as a self-contained, reusable View - a single source of truth for presenting data to the user.

**Key Benefits:**

- Automatic memoization of View components without any time or space complexity.

- Clean separation between View rendering and VM updates

- Type-safe VM prop passing with isolation between parent props and ui logic props.

- Reduced boilerplate for common MVVM patterns
### VM - ViewModel
The ViewModel serves as the UI logic layer - the component that typically exhibits the most variation in implementation.

For instance, a button ViewModel might handle:
- Saving data
- Canceling operations
- Deleting items
- And numerous other context-specific actions

**Problem with Traditional Approach:**

- When using conventional patterns, developers often create parent components to manage multiple child logics. This approach:
- Violates the Single Responsibility Principle
- Introduces unnecessary complexity
- Reduces code readability
- Makes maintenance more difficult

**So we need a reusable component that:**

- Handles all related ui logic internally.

- Passes processed data to the View.

- Connect to the model or any logical layer.

- Can handle react hooks.

To standardize this pattern and ensure all VMs follow the same convention for data exchange with Views (compatible with BaseView), we created BaseVM - the foundational class for all ViewModels.

**Implementation Example: Logout Button**
```ts
// vms/clear-all-data-vm.ts
export default class LogoutButtonVM extends BaseVM<ButtonVm> {
  private model: AuthenticationModel;

  useVM(): ButtonVm {
    const { t } = useTranslation();
    return {
      props: {
        isDisable: false,
        title: t("logout"),
      },
      onClick() {
        this.model.logout();
      },
    };
  }
}
```
As demonstrated in this example, we created a ViewModel by extending BaseVM. To define the required UI contract, we pass the interface to BaseVM as a generic type - the same interface we implemented for the View. This ensures the View remains unaware of any VM variations, simply receiving the interface it needs to render the output.

This architecture enables thousands of different VMs to be reused with a single Button component.

**In this specific implementation, we:**
- Managed the button title through translation
- Connected the click event to the Model's logout method
- Established a clean connection between View and business logic through the ViewModel
### Connection

> Important note
## Memoization by vm 

## Dynamic VMs

## Usage with di

## All Apis

### BaseView

### BaseVM