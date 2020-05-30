# Pro MERN Stack 2nd Edition book project

This file documents my progress through each chapter of Pro MERN Stack (1nd Ed.) by Vasan Subramanian.

# Chapter Notes

## Chapter 4

* In this chapter we use React and change how the component looks and what it shows on screen. We will add a button, and append a row to the initial list of issues on click of the button.
* First we set the initial state in the constructor of the component. This is dont by assigning the variable `this.state` to the set of state variables and their values.
* Using asynchronous calls to `React.Component`'s `this.setState()` method we initialise the state. We use the `lifecycle` method `componentDidMount()` to make sure that `this.setState()` method is called only after the component is rendered.
* To add a new issue, without changing the complete state we create a copy of the issues array and push the new issue into it. Then we call `this.setState()` with the new array. We don't have to write code to add a new row in the DOM, React calculates the changes to the virtual DOM and inserts the new row.
* Next, we move the initiation of the creation of new issues to the `IssueAdd` component. For this we need to move the initialisation of the state in the constructor of `IssueTable` and the methods `componentDidMount()`, `loadData()`, and `createIssue()` to the `IssueList` component. This is because horizontal communication is hard and information can be passed from parents to children only. 
* We add a button that will trigger the addition of issues from the text input fields. We need to supply the properties `onClick` and `onSubmit` to the elements to handle `onclick` and `onsubmit` events. To get the values from the text input fields we use the form handle via `documents.forms.issueAdd`.

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