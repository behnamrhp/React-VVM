# React vvm

## Table of contents
- [React vvm](#react-vvm)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
  - [Motivation](#motivation)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [IVM](#ivm)
    - [View](#view)
    - [VM - ViewModel](#vm---viewmodel)
    - [Usage Example](#usage-example)
  - [Memoization by vm](#memoization-by-vm)
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
### IVM 

### View

### VM - ViewModel

### Usage Example

## Memoization by vm 

## Usage with di

## All Apis

### BaseView

### BaseVM