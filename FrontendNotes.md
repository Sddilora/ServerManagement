# This file contains the terms and explanatanions of the terms used in the project's frontend part

## What is Angular?

- Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.
  
## What is TypeScript?

- TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language.
  
## The Essentials of Angular

### Components

- Comonents are the building blocks that compose an application.
- A component includes a TypeScript class with a @Component() decorator, an HTML template, and styles.

```typescript
// A minimal angular component
import { Component } from '@angular/core';

@Component({
  selector: 'hello-world',
  template: `
    <h2>Hello World</h2>
    <p>This is my first component!</p>
  `
})
export class HelloWorldComponent {
  // The code in this class drives the component's behavior.
}
```

To use this component, we write the following in a template:

```html
<hello-world></hello-world>
```

### Templates

- Templates are used to define a component's user interface.
- Every component has an HTML template that declares how that component renders.
- We define this template either inline or by file path.
- Angular adds syntax to HTML that allows us to build dynamic HTML templates.
  
```html
    <h2>{{title}}</h2>
    <p>{{description}}</p>
```

Their values are defined in the component class:

```typescript
export class HelloWorldComponent {
  title = 'Hello World';
  description = 'This is my first component!';
}
```

- Angular also supports property bindings, to help us set properties and attributes of HTML elements.

```html
    <img [src]="imageUrl">
      You can set my url in the component!
```

- We can also use event bindings to listen to events raised by HTML elements.

```html
    <button (click)="doSomething()">
```

```typescript
export class HelloWorldComponent {
  doSomething() {
    // Do something
  }
}
```

- We can add features to our templates with directives.
- The most popular directives in Angular are *ngIf and *ngFor.

#### *ngFor

- The ngFor directive is used to repeat a template for each item in a list.

```html
    <ul>
      <li *ngFor="let item of items">{{item}}</li>
    </ul>
```

```typescript
export class HelloWorldComponent {
  items = ['item1', 'item2', 'item3'];
}
```

#### *ngIf

- The ngIf directive is used to conditionally render a template.

```html
    <div *ngIf="show">
      <p>This is only rendered if show is true.</p>
    </div>
```

```typescript
export class HelloWorldComponent {
  show = true;
}
```

### Dependency Injection

- Dependency injection is a design pattern that allows us to remove hard-coded dependencies and make our application loosely coupled, extendable, and maintainable.
- This feature lets us declare the dependencies of our TypeScript classes without taking care of their instantiation. Instead, Angular handles the instantiation for us.

```typescript
// logger.service.ts
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class Logger {
  writeCount(count: number) {
    console.warn(count);
  }
}
```

```typescript
// hello-world-di.component.ts
import { Component } from '@angular/core';
import { Logger } from '../logger.service';

@Component({
  selector: 'hello-world-di',
  templateUrl: './hello-world-di.component.html'
})
export class HelloWorldDependencyInjectionComponent  {
  count = 0;

  constructor(private logger: Logger) { }

  onLogMe() {
    this.logger.writeCount(this.count);
    this.count++;
  }
}
```

```html
<!-- hello-world-di.component.html -->
<button (click)="onLogMe()">Log Me</button>
```

- In the above example, we have a Logger service that we want to use in our component.
- We use the @Injectable() decorator to tell Angular that this class is a service that can be injected into other classes.
- We use the providedIn property to specify the root injector, which is the application-level injector that is responsible for creating the instance of the service.
- We use the constructor to declare the dependency on the Logger service.
- We use the private keyword to tell TypeScript to create a private field on the class.
- We use the onLogMe() method to call the Logger service and write the count to the console.
- We use the click event binding to call the onLogMe() method when the button is clicked.

### Angular CLI

- The Angular CLI is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications.
  
| Command | Description |
| --- | --- |
| ng build | Compiles an Angular app into an output directory named dist/ at the given output path. |
| ng serve | Builds and serves your app, rebuilding on file changes. |
| ng test | Runs unit tests in a project. |
| ng e2e | Builds and serves an Angular app, then runs end-to-end tests using Protractor. |
| ng generate | Generates or modifies files based on a schematic. |

### First Party Libraries

| Library | Description |
| --- | --- |
| Angular Router | Advanced client-side navigation and routing based on Angular components. Supports lazy-loading, nested routes, custom path matching, and more. |
| Angular Forms | Uniform system for form participation and validation. |
| Angular HTTP Client | Communicates with a server to load and save data. Supports HTTP, JSONP, and other protocols, with built-in and custom interceptors that let you transform and cache requests and responses. |
| Angular Animations | Animates transitions between states in the application. |
| Angular PWA | Tools to help build Progressive Web Apps. Including a service worker, app manifest, and Angular schematic to add features like install prompts and offline support. |
| Angular Schematics | Automated scaffolding, refactoring, and update tools that simplify development at large scale. |
