# This file contains the terms and explanatanions of the terms used in the project's backend part

## Index

- [Bean](#bean)

## @Bean

### What does the term "Bean" means?

- In the context of the Spring Framework, a "bean" is an object that is managed by the Spring IoC (Inversion of Control) container.
- It is an instance of a Java class that is created, configured, and assembled by the container.
- Beans are the fundamental building blocks of a Spring application, and the Spring container is responsible for managing the lifecycle and dependencies of these beans.
  
### Key characteristics of beans in the Spring Framework

1. Managed by the Spring IoC container: Instead of creating objects directly using the new keyword, you define bean definitions in the Spring configuration, and the container handles the instantiation.
2. Dependency Injection: Spring supports dependency injection, where beans can have dependencies on other beans. Objects define their dependencies, and the container injects them when it creates the bean.
3. Configuration: Beans are typically defined in XML configuration files, Java configuration classes (using annotations like @Bean), or through component scanning. The configuration tells the container how to create and configure the beans.
4. Singleton or Prototype: By default, beans are singletons, meaning the container creates only one instance of a bean and reuses it throughout the application. However, you can configure beans to be prototypes, where a new instance is created every time it is requested from the container.
5. AOP and Additional Features: Beans can benefit from Spring's AOP (Aspect-Oriented Programming) capabilities, which allow you to add cross-cutting concerns to your application, such as logging, security, or transactions.

### What does the term "Bean" means outside the context of the Spring Framework?

- Outside the context of the Spring Framework, a bean is a reusable software component that can be manipulated visually in an application builder tool.
- In other contexts, the term "bean" might have a more general meaning. For example, in **JavaBeans**, which is a standard for reusable software components in Java, a "bean" is a Java class that follows certain conventions like having a public default constructor, getter and setter methods, and being serializable.
- In Enterprise Java, the term **Enterprise JavaBean** (EJB) is used to describe a server-side component architecture for building distributed, transactional, and scalable applications.
- In some programming languages and frameworks, the term "bean" or similar concepts might also refer to **data transfer objects (DTOs)**, **plain-old Java objects (POJOs)**, or any class that serves as a simple container for data with getter and setter methods.
  
### In Summary

- A bean in the Spring Framework is an object managed by the Spring IoC container, and its lifecycle, dependencies, and configuration are handled by the container. Spring beans facilitate loose coupling, modular design, and flexibility in building enterprise-level Java applications.
