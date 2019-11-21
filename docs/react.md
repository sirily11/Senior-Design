# React basic tutorial

## What is react.

React is a javascript framework written by Facebook. React using declarative syntax to construct UI component and use state to update the UI whenever user interact with the UI.

So let's take a very simple example to start our tutorial.

## Basic React Import

> Use following button to run the code in your browser

[![Edit React Part 1](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/angry-almeida-l6gh8?fontsize=14&hidenavigation=1&theme=dark)


This is a very simple example too see what react can do. First let's take a look at the code itself.

```tsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "semantic-ui-react";
```

These three lines of code is simplely import the libraries. This is es6 syntax. You will see that there are two different imports above. If you have the export like this
```tsx
export default class Person{


} 
```

Use following import

```tsx
import Person from "person" 

```

If your class looks like this

```tsx
export class Person{}

```

Then use the following import
```tsx
import { Person } from "person"
```

## React State

Take look at this line of code

```tsx
 const [count, updateCount] = useState<number>(0);
```

As you see, we declear variable count here. However, you cannot change count's value directly because it is const.  But you can change the value through upDateCount. This is a function which takes a number as parameter.

```tsx
 updateCount(num: number)
```
And whenever you call this function, the Component will update.
```tsx
    /// When button is clicked, the value will be updated
    <Button
        icon="add"
        onClick={() => {
          updateCount(count + 1);
        }}
      />

```
