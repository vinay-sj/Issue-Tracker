# Pro MERN Stack 2nd Edition book project

This file documents my progress through each chapter of Pro MERN Stack (1nd Ed.) by Vasan Subramanian.

# Chapter Notes

## Chapter 5

* A router in Express takes a client request, matches it against any routes that are present, and executes the handler function that is associated with that route. The route specification consists of an HTTP method, path specification and the route handler.
* The difference between a middleware function and route is that a middleware function deals with any request matching the path specification, whereas a route matches a request with a specific HTTP method.
* When a request is received, the first thing that Express does is match the request to one of the routes. The request method is matched against the route’s method.
* Route parameters are named segments in the path specification that match a part of the URL.
* Multiple routes can be set up to match different URLs and patterns, but the first match will be used. After matching the handler function is called.
* Request object's properties and methods can be used to inspect any aspect of the request and the response object can be used to construct and send a response.
* Middleware functions have access to the request object, the response object, and the next middleware function in the application’s request-response cycle.
* HTTP method and operation mapping are well mapped and specified in REST but, it doesn't lay down rules for the following:
    * Filtering, sorting, and paginating a list of objects.
    * Specifying which fields to return in a READ operation
    * If there are embedded objects, specifying which of those to expand in a READ operation.
    * Specifying which fields to modify in a PATCH operation.
    * Representation of objects. We are free to use JSON, XML, or any other representation.
* GraphQL has the following salient geatures:
    * The properties of an object that need to be returned must be specified and its invalid to request nothing.
    * It's graph based i.e. relationships between objects are naturally handled in the GraphQL API.
    * It has a single endpoint. The name of the resource being accessed is supplied as part of the query.
    * It's strongly typed. All fields and arguments have a type.
* Packages like `graphql-tools` and `apollo-server` build on top of GraphQL.js(the reference implementation of GraphQL) to add advanced features.
* In GraphQL schema language we have to define each type using the type keyword followed by the name of the type, followed by its specification within curly brackets.
* GraphQL schema has two special types that are entry points into the type system, called `Query` and `Mutation`. Query fields are expected to return existing state, whereas mutation fields are expected to change something in the application’s data.
* Query fields are executed in parallel whereas mutation fields are executed in series.
* In the Schema Language we can indicate that the value is mandatory by adding an exclaimation character(!) after the type.
* Resolvers resolve a query to a field with real values. Its  specified as nested objects that follow the structure of schema and at every level the field is resolved using a function of the same name as the field.
* To initialize the GraphQL server we have to construct an `ApolloServer` object. The constructor takes in an object with at least two properties-`typeDefs` and `resolvers`-and returns a GraphQL server object.
* In the GraphQL Playground the query language used is not JSON, it follows the same hierarchical structure of the schema. The output is regular JSON.
* We use `List API` to fetch the list of issues. We have to define a custom type `Issue` containing all the fields of the issue.
* In GraphQL to specify a list of another type we enclose it within square brackets. We could use `[Issue]` as the type for the field.
* To use the APIs we need to make asynchronous API calls(AJAX calls) by using libraries like jQuery. Modern browsers support Ajax calls natively via the Fetch API.
* To fetch data list of issues we create a GraphQL query in the `loadData()` method and send within a JSON, as part of the body to the fetch request. 
* If we are using `awaits` within the function, we need to add the keyword `async` for the function definition.

### Errors & Issues

* The setup of `apollo-server` was showing an error `Error: Cannot find module 'graphql/validation/rules/PossibleTypeExtensions'` with the command in page 97. After going through the posts on piazza, I installed the version to 2.3+ using the command `npm install graphql@0 apollo-server-express@2.3` which fixed the issue.

## Chapter 4

![ch04](/readme_images/Chapter4.png)

* In this chapter we use React and change how the component looks and what it shows on screen. We will add a button, and append a row to the initial list of issues on click of the button.
* First we set the initial state in the constructor of the component. This is done by assigning the variable `this.state` to the set of state variables and their values.
* Using asynchronous calls to `React.Component`'s `this.setState()` method we initialise the state. We use the `lifecycle` method `componentDidMount()` to make sure that `this.setState()` method is called only after the component is rendered.
* To add a new issue, without changing the complete state we create a copy of the `issues` array and push the new issue into it. Then we call `this.setState()` with the new array. We don't have to write code to add a new row in the DOM, React calculates the changes to the virtual DOM and inserts the new row.
* Next, we move the initiation of the creation of new issues to the `IssueAdd` component. For this we need to move the initialisation of the state in the constructor of `IssueTable` and the methods `componentDidMount()`, `loadData()`, and `createIssue()` to the `IssueList` component. This is because horizontal communication is hard and information can be passed from parents to children only. 
* We create a form with text field inputs and a button that will trigger the addition of issues. We need to supply the properties `onClick` and `onSubmit` to the elements to handle `onclick` and `onsubmit` events. To get the values from the text input fields we use the form handle via `documents.forms.issueAdd`.
* Finally, we replace all components which have no state and only takes in props and renders it, with functions with the same name.  
* Props are immutable, whereas state is not.
* Parents communicate to children via props, when state changes, the props automatically change. Children communicate to parents via callbacks. Siblings and cousins can’t communicate with each other, we have to lift the state up.

## Chapter 3

![ch03](/readme_images/Chapter3.png)

* In this chapter we lay out the main page of the issue tracker with a list of issues.
* First, we convert the single line JSX into a single React component instantiated from a React class. We create a React class `HelloWorld` and create an instance of it.
* Next, we split large components in to smaller logically separated components. We place all these components in the same file for now.
* To pass different input data from a parent component to a child component we use an attribute when instantiating the component. The attribute's value can be accessed in the child via a variable called `props` which is available via the `this` accessor.
* To pass nested elements they have to be enclosed between the opening and closing tags of the JSX expression. The parent component can access the children element using this.props.children and the parent component can determine where it needs to be displayed.
* Next, we replace the hard coded set of `IssueRow` components with a list of issues, fetched from a JavaScript array. We will later fetch from a database. Using `map()` method of `Array` we map each issue object to an `IssueRow` instance.  We need to identify each instance  of `IssueRow` with a `key` so that React can optimize the calculation of the differences when things change.
* On page 55 in listing 3-6 a single quote before 'New' is missing.

## Chapter 2

![ch02](/readme_images/Chapter2.png)

* In this chapter we build a Hello World application to render the page with React and serve it from a web server using Node.js and Express.
* We start by building a server-less React application that displays Hello World.
* Using JSX we replace `createElement()` function calls. The JSX is transformed to regular JavaScript using a compiler provided by Babel at runtime which makes it slow.
* Next. we install nvm, Node.js and express.  
* Using Express we setup a server to serve HTTP requests. We create a file `server.js` for this. We change the start script in the `package.json` file to let npm know the entry point for the server.
* To have all the scripts that require compiling at the same place, we move all the JSX from `index.html` to another file `App.jsx`. All the JSX files are placed in the `public` folder(The folder is to be created in the root directory).
* We install some Babel tools to transform JSX to plain JavaScript. Now, the transformation takes place in build time.
* We create a file `.babelrc` to specify the presets that needs to be used. Using the preset `preset-env` we specify the target browsers that we support and Babel automatically applies all the transforms and plugins that are required. Babel polyfill is used to supplement the missing function implementations in older browsers.
* We add `watch` and `compile` scripts to the `package.json` to automatically recompile when a change takes place in the source files. Similarly, nodemon is used to restart the server on changes.
* Finally, to start the server we run `npm run watch` and `npm start` on different terminals.