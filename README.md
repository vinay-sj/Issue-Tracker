# Pro MERN Stack 2nd Edition book project

This file documents my progress through each chapter of Pro MERN Stack (2nd Ed.) by Vasan Subramanian.

# Chapter Notes

## Chapter 15

In this chapter we deploy the application to the public internet. The clickable link to my deployed issue tracker application is:

[https://tracker-ui-vinay-sj.herokuapp.com](https://tracker-ui-vinay-sj.herokuapp.com)

My deployment repositories can be found below:

[https://github.com/vinay-sj/tracker-api](https://github.com/vinay-sj/tracker-api)

[https://github.com/vinay-sj/tracker-ui](https://github.com/vinay-sj/tracker-ui)

![ch15](/readme_images/Chapter15.png)

* The simplest way to deploy an app on Heroku is using a Git repository. We need two repositories, one for the API server `tracker-api` and the UI server `tracker-ui`.
* Heroku uses the environment variable `PORT` to let the application know which port the traffic will be received in the container the application is deployed in.
* By setting the `engines` property in `package.json` we can specify the version of npm and Node.js that has to be used by Heroku.
* To create and initialize the application on Heroku we need to use the Heroku CLI command `create`. The creation will add a Git repository on Heroku, referred locally as `heroku`. To deploy the application we need to push to this repository.
* The script `postinstall` is run right after `npm install` finishes. It can be used to run the compilation and link Bootstrap's static CSS and JavaScript files. It takes effect both when we run `npm install` locally as well as after Heroku runs `npm install` after deployment.
* The script `heroku-postbuild` is specific to Heroku. That is, this script is run only on Heroku deployments, and not when a developer runs npm install on the local computer.
* Using the technique `Name Based Virtual Hosting` we can specify which application the request should land on so that it can be routed to the appropriate application. This is done using the `Host` header in the HTTP request.

### Errors and Issues

* I had named the cluster as `issuetracker` instead of `cluster0` in Atlas, so had to change the DB_URL to `mongodb+srv://IssueTracker:PPP@issuetracker.wjwik.mongodb.net/issuetracker`.
* While changing the environment variable from `DB_URL` to `MONGODB_URI`, changes should be made to `db.js`, the `.env` files and the heroku configuration code described in page 519.

## Chapter 14

![ch14](/readme_images/Chapter14.png)

* In this chapter, we will implement the authentication mechanism. We will use Google Sign-In for Websites which uses the OAuth2 mechanism.
* The various options for integrating with Google Sign-In are listed in the “Guides” section at [https://developers.google.com/identity/sign-in/web/sign-in](https://developers.google.com/identity/sign-in/web/sign-in).
* We need to create a console project and a client ID to identify the project and use the origin URL as `http://localhost:8000` as of now.
* The code for the sign in component is taken from the 'Building a Custom Graphic' section of the guide.
* The technique to validate a token at the back-end is described in the guide “Authenticate with a Backend Server,” at [https://developers.google.com/identity/sign-in/web/backend-auth](https://developers.google.com/identity/sign-in/web/backend-auth).
* The client authentication library returns a token on successful authentication, which can be verified at the back-end using Google’s authentication library for Node.js. We send this token from the UI to the back-end for it to be verified.
* To persist the authentication information we use JSON Web Tokens(JWT). It encodes the session information that needs to be stored in a token.
* Creating our own token lets us add more variables, for example, a role identifier can be added to the session information and that can be quickly retrieved to apply authorization rules.
* The token is sent across as a cookie to avoid cross-site-scripting (XSS). To prevent the cookie from being read programmatically by setting the `HttpOnly` flag on the cookie. The downside is that the amount of information that can be saved is only 4kb.
* Cookies expose application to Cross-Site Request Forgery (XSRF), and to avoid this we need a XSRF token with every request. Our application is not vulnerable to XSRF as there are no conventional HTML forms, and the GraphQL API accepts only `application/json` POST request. The API calls using GET method is vulnerable to XSRF, but we disable it in our application since we don't use it.
* If we set the `HttpOnly` flag in the cookie, it cannot be programmatically accessible from the front-end code, it can only cleared by the server code.
* GraphQL library passes a third argument, the context, which can be customized to the application’s requirements. We set the user information as the context and let each resolver check whether the credentials are good enough to serve the request.
* React Context API pass properties across the component hierarchy without making intermediate components aware of it. The created context exposes a component called `Provider` under it, which needs to be wrapped around any component hierarchy that needs the context.
* The cors deals with setting up the necessary headers in the preflight requests to the API server. We can use it to enable CORS for the `/auth` set of routes.
* To let credentials pass to cross-origins, the following must be done:
    * All XHR calls must include the header `credentials: 'include'`.
    * Including credentials from any origin should be disallowed. The CORS middleware should include an origin as a configuration option.
    * The server must explicitly allow sending credentials. It can be done using the CORS configuration option called `credentials`.
* To test whether our application works for real domains we create a domain and two sub-domains, both of which point to the localhost. 

### Errors and Issues

* The Google Developers Console screen has been updated, and is different from the one shown in the book.
* In listing 14-3 on page 475 it's said to replace our own client ID in place of `YOUR_CLIENT_ID` in the code `GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com`. We should replace the whole client ID and not the `YOUR_CLIENT_ID part.
* In listing 14-15 on page 490, in order to sign out correctly, the domain should be included in the `clearCookie` response from the server. The code should be:
```
 res.clearCookie('jwt', {
       domain: process.env.COOKIE_DOMAIN,
   });
 ```

## Chapter 13

![ch13_1](/readme_images/Chapter13_1.png)

![ch13_2](/readme_images/Chapter13_2.png)

* To reuse the common code across many components we can create a new component that wraps each of the main views. 
* The pattern of creating a new component class from an existing component class and injecting into it additional functionality is called `Higher Order Component (HOC)`.
* MongoDB `pipeline` is a series of transforms on the collection before returning the result set. Each stage transforms the documents as they pass through the pipeline. A `match` stage will act like a filter on the list of documents from the previous stage. To transform the document, a `project` stage can be used.
* The `group` stage produces a summary of documents. The `unwind` stage expands array fields into one document for each array element. For other stages refer [https://docs.mongodb.com/manual/reference/operator/aggregation/](https://docs.mongodb.com/manual/reference/operator/aggregation/)
* MongoDB provides the collection method `aggregate()` to summarize and perform various other read tasks on the collection using a `pipeline`. The `aggregate()` method takes a single parameter, an array of pipeline stage specifications. Each stage specification is an object with a key indicating the type of the stage and the value holding the parameters for the stage.
* For pagination, we can use the MongoDB cursor method `skip()` to get the list of documents starting at an offset and the `limit()` cursor method to limit the output to a certain number.
* Without an explicit sort order, MongoDB does not guarantee any order in the output.
* MongoDB’s text index, quickly gets to all the documents that contain a certain term. A text index gathers all the terms (words) in all the documents and creates a lookup table that, given a term (word), returns all documents containing that term (word).  This is not a pattern search. Also, common words like “in”, “when,” etc. are not indexed, and searching for these will result in no matches.

### Errors and Issues

* In listing 13-5 on page 436, the line `Lorem ipsum dolor sit amet, ${i}` should use backticks instead of single quotes.
* In listing 13-24 on page 467, the line `history.push('/edit/${value}');` should use backticks instead of single quotes.

## Chapter 12

![ch12](/readme_images/Chapter12.png)

* `Isomorphic` applications are those that use the same codebase on the server as well as the client to do either task: render to the DOM or create HTML.
* Server rendering fetch data via APIs and construct the DOM on the browser, the entire HTML is constructed on the server and sent to the browser.
* To have pages from an application be properly indexed by search engines, the server needs to respond with the same HTML that will result after the Ajax call in `componentDidMount()` methods and subsequent re-rendering of the page.
* In our application, the first time any page is opened in the application, the entire page will be constructed and returned from the server. This is `server rendering`. Once any page is loaded and the user navigates to another page, we’ll make it work like an SPA. That is, only the API will be made and the DOM will be modified directly on the browser. This is `browser rendering`.
* If an application does not need to be indexed by search engines, the complexity introduced by server rendering can be avoided. Typically, if the pages do not have public access, they don’t need search engine indexing.
* What we’ll need instead is three sets of files in the UI directory:
    * All the shared files, essentially, all the React components(`src`).
    * A set of files used to run the UI server using Express. This will import the shared React components for server rendering(`server`).
    * A starting point for the browser bundle, one that includes all the shared React components and can be sent to the browser to execute(`browser`).
* The method to create an HTML on the server side is `ReactDOMServer.renderToString()`.
* The browser rendering serquence is:
    * The user types in the URL of the home page or refreshes the browser at the home page.
    * The UI server returns index.html, which has a reference to the JavaScript app.bundle.js. That is also fetched, and it contains the react components, including the About component. Now, the page is considered loaded.
    * The user clicks on the link to the About page.
    * React mounts and renders the About component, whose code is part of the JavaScript bundle. At this point, all the static text in the component is seen.
    * Once the initial mount is completed, `componentDidMount()` is called, which will trigger a call to the API server to fetch the data for the component. 
    * On successful fetch of the data using the API call, the component is re-rendered with the data.
* The Babel compiler places any variables exported using the export default keywords also in `module.exports`, but using the property `default`.
* The server rendering sequence is:
    * The user types in the URL for the About page.
    * The browser sends a request to /about to the UI server.
    * The UI server fetches the data required for the page from the API server using a GraphQL API call.
    * On the UI server, `ReactDOM.renderToString()` is called with the About component and its data.
    * The server returns an HTML, with the markup for the About page included in it.
    * The browser converts the HTML to the DOM and the About page is visible in the browser.
* Webpack can be used for the server as well, and it can compile JSX on the fly. 
* The difference of Webpack in the front-end is that many server-side Node packages such as Express are not compatible with Webpack. They import other packages dynamically, making it hard for Webpack to follow the dependency chain. We have to exclude the third-party libraries from the bundle and rely on `node_modules` to be present in the UI server’s file system.
* In the back-end `source-map-support` module makes error messages more readable and in the front-end lets us add breakpoints.
* To avoid restarting the server for every change, we use HMR to automatically reload the modules in the back-end. 
* We create a new Webpack configuration that enables HMR for the server. Since we don’t have a server to serve the bundle in the case of the server code, we’ll have to create a separate configuration file. We use `webpack-merge` to merge changes to the original configuration for HMR.
* To automatically reload the new changed modules in the express route we will create a function wrapper and call `render()` explicitly within this. Then the `render` function called is always the latest one.
* Since we are using HMR to load modules automatically, we remove nodemon from the `start` script.
* On the server, we use `StaticRouter` in place of `BrowserRouter`. The StaticRouter has to be supplied the URL. Based on this, the router will choose an appropriate component to render. StaticRouter takes a property called `location`, which is a static URL that the rest of the rendering will need. It also needs a property called `context`.
* React makes a distinction between rendering the DOM to replace a DOM element and attaching event handlers to the server-rendered DOM. We receive a warning to change `render()` to `hydrate()`. When we use `hydrate` React attaches all the handlers.
* To be able to make request to the API server via `graphQLFetch()` from the server, we need to replace `whatwg-fetch` module with `isomorphic-fetch` module as it can be used both on the browser as well as Node.js.
* We can use the Webpack's plugin called `DefinePlugin` to define global variables that are available at runtime. This can be used to indicate whether functions are called from the browser or Node.js by defining a variable `__isBrowser__`.
* To pass information down to the `About` component while it's being rendered, we can use a `global` store for all the data that is needed for the hierarchy of components that need to be rendered. The users of this module assign key values that will be available globally by importing this module.  
* To have the data required via API calls available before rendering is initiated on the server, we need to keep a common source of truth for the list of routes available. Then, we could match the request’s URL against each route and figure out which component (and therefore, which fetchData() method) will match.
* To determine which of the components would match the current URL that is passed in via the request object in render.jsx we could use a function called `matchPath()` exposed by React Router.
* To work with server rendering using dynamic routing, we include the optional Issue ID in the route specification of `IssueList` and this component deals with the loading of the detail part. This has the following advantages:
    * The route specification remains simple and has only the top-level pages in a flat structure, without any hierarchy.
    * It gives us an opportunity to combine two API calls into one in the case where the Issue List is loaded with a selected issue.
* The way to specify that a parameter is optional in the route is by appending a `?` to it.
* To make the server itself respond with a 301 Redirect so that the browser fetches `/issues` instead of `/` we use the React Router's `StaticRouter`. It handles this by setting a variable called `url` in any context that is passed to it.

### Errors and Issues

* In listing 12-2 and 12-3 on page 379, `rules` need to be in quotes `"rules"`.
* In listing 12-3 on page 379, `always` and `error` should be in double quotes and not single quotes.
* In listing 12-29 on page 401, the code is wrongly given as:
```
if (!process.env.UI_SERVER_API_ENDPOINT) {
process.env.UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;
}
```
It should have been
```
if (!process.env.UI_SERVER_API_ENDPOINT) {
process.env.UI_SERVER_API_ENDPOINT = process.env.UI_API_ENDPOINT;
}
```
* In listing 12-45 we have to add `parseInt(id, 10)` into the graphQLFetch method.
* In the section `Data Fetcher with Parameters` I had mistakenly named the function as `fetchdata()` instead of `fetchData()`. This error was causing an API call to fetch the list of issues on refresh.

## Chapter 11

![ch11](/readme_images/Chapter11.png)

* In this chapter, we will use Bootstrap to make our UI look better.
* React-Bootstrap contains a library of React components and has no CSS styles or themes itself. It requires Bootstrap stylesheet to be included in the application to use these components.
* The latest version of Bootstrap (Version 4) is not yet supported by React-Bootstrap. So, we use Version 3 of the bootstrap stylesheet.
* One way to inlcude the Bootstrap stylesheet in the application is to use Webpack’s style and CSS loaders. This can be done using `import` statement. Webpack would build the dependency tree and include all the styles that have been imported in the bundle that is created. When the application is loaded, the string is placed into the DOM as a `<style>` node.
* Bootstrap is shipped as a monolithic stylesheet. Even if only a single component is being used, the entire CSS has to be included. So we just include the entire stylesheet as is.
* We need to let the mobile browser that the application knows how to handle small screens. The way to do so is by adding a meta tag in the main page, called viewport, the content of which specifies an initial width equal to the device’s width and an initial zoom of 100%.
* The list of components available is found in the React-Bootstrap documentation at [https://react-bootstrap.github.io/components/alerts/](https://react-bootstrap.github.io/components/alerts/).
* To make the component look distinct we can use a property `bsStyle`. For example, Button has allowed styles `primary`, `success`, `info`, `warning`, `danger`, and `link`.
* The list of Glyphicon icons that components recognize is available at the Bootstrap website at [https://getbootstrap.com/docs/3.3/components/](https://getbootstrap.com/docs/3.3/components/).
* To add a tooltip to the component we use the `Tooltip` component.
* To make the tooltip shown when hovering over the compoent, we use the `OverlayTrigger` component that wraps the component and takes in the ToolTip component as a property.
* To change the placement of the tooltip we can use the `placement` property.
* The starting component for a navigation bar is `Navbar`. Each item is a `NavItem` and they can be grouped in a `Nav`. To align the `Nav` element to the right we use the `pullRight` property.
* We could use `Navbar.Header` and `Navbar.Brand` for the application title.
* The React-Bootstrap component NavDropdown can be used to create a dropdown menu, with each menu item being a MenuItem component.
* We use `react-router-bootstrap` package, which provides a wrapper called `LinkContainer` to add actions to the navigation items.
* To show sections separately using a border and an optional heading we can use the `Panel` component.
* To make a panel collapsible to save space we can add the `collapsible` property to the `Panel.Body` and, we can set the `toggle` property to the panel title so that it can control the collapse behavior.
* To add a margin to our application we use the grid system of Bootstrap. There are 2 grids, a fluid one, which fills the entire page, and a fixed one (the default), which has a fixed size, but one that adapts to the screen size.
* A Bootstrap table looks better, expands to fit the screen, and highlights a row on hover.
* Using the `LinkContainer` we can make an entire row clickable.
* To prevent an event from propagating from the buttons to the contained row, we’ll need to call e.preventDefault() in the handlers.
* Using React-Bootstrap, the common input types are instantiated using a FormControl. By default, it uses a regular `<input>` type to render the actual element. The `componentClass` property can be used to change this default to any other element type.
* A label can be associated with the form control using the `ControlLabel` component.
* The `InputGroup.Addon` component can be used to display  inputs next to each other, as well as show the dash between two inputs instead of one below the other.
* Instead of using a space character in between two buttons we can use `ButtonToolbar` component to keep the buttons together.
* If we want fields to occupy space next to its precedent, or below its precedent if the width of the screen doesn't allow it we use Bootstraps grid system.
* In the grid system, the horizontal space is divided into a maximum of 12 columns. A cell (using the component `Col`) can occupy one or more columns and a different number of columns at different screen widths. The cells wrap if there are more than 12 column-space cells within a row (`Row` component). 
* `xs` property denotes extra small screen width. The width allocation for other screen sizes can be specified using sm, md, and lg, which stand for small, medium, and large screens, respectively. If not specified, the value applicable to the screen size lesser than this size will be used. Thus, using xs only will mean the same cell widths are used for all screen sizes.
* For inline forms, we need a `<Form>` with the `inline` property to wrap around the form controls. Unlike the grid-based form, an inline form needs no columns and rows.
* To lay out a horizontal form, we need the `horizontal` property, therefore, we need to replace a plain `<form>` with Bootstrap’s `<Form>` and set this property.
* Bootstrap’s form controls support displaying invalid input fields using the `validationState` property. A value of `error` for this property makes it display the label and the control in red, as well as an red cross icon to indicate the same within the form control.
* Bootstrap provides nicely styled alerts via the `Alert` component. It has different styles for the message like `danger` and `warning`, and it also has the ability to show a Close icon. The Alerts visibility needs to be handled by the parent component.
* To implement a close icon as part of a `<Alert>` we have to pass in a handler that modifies the visibility state. The `Alert` component takes in a callback named `onDismiss` to achieve this.
* React-Bootstrap’s Collapse component has a property `in` which determines whether its child element fades in or out. When set to `true`, the child element shows (fades in) and when set to `false`, it hides (fades out).
* `Modal` works better when the number of required fields is small. When a `modal` is rendered, it is rendered outside the main `<div>` of the DOM that holds the page. Thus, in terms of code placement, it can be placed anywhere in the component hierarchy.
* The root of the modal dialog definition is the `Modal` component. This component requires two important properties: `showing`, which controls the visibility of the modal dialog, and an `onHide()` handler, which will be called when the user clicks on the cross icon to dismiss the dialog.

### Errors and Issues

* On page 328, there is a strike-through missing in the code in `Listing 11-7`. The `<hr />` after the newly added Panel should have been striked. 
* In listing 11-10 in page 333, `withRouter` has been wrongly striked out. `Link` should be have been striked out instead. To keep the label and the control together, they need to be put together under a FormGroup.
* On page 373, in the changes to `IssueList.jsx` the book should have striked out the line
```
this.createIssue = this.createIssue.bind(this);
```

## Chapter 10

![ch101](/readme_images/Chapter10_1.png)

![ch102](/readme_images/Chapter10_2.png)

* In this chapter, we convert the hard coded filter to something more flexible with user input, and fill the Edit page with a form. Then we add the ability to delete issues from the Issue List page.
* To be able to show a value in the input, the component has to be controlled by the parent via a state variable or props variable. This is done by setting the value of the input to that state or props variable. The input form element whose value is controlled by React in this way is called a controlled component.
* To change the value of the dropdown when using controlled components, we have to get hold of the new value, the `onChange()` event has trapped. When the user changes the value, the state variable can be updated with the new value using `setState()`.
* To filter the Assignee filed we would have to add a text input, and in its `onChange`, we have to update a state variable and use that in the filter.
* To add a filter on the Effort field(a number), we need two fields, a minimum and maximum value to filter on, both of which are optional.
* To check the presence of an `id` field in the issue object and avoid rendering the form we check if the `id` field is invalid, if it's invalid we show an error message. If, not we assume the page is in the middle of completing loading the data and return null in the `render` method. We use double-equals rather than triple-equals, so that it matches anything that seems like null.
* It is not advisable to use `this.state` directly when arriving at a new state, teh recommended way is to supply a callback to the `setState` method that takes in the previous state and returns a new state.
* In the form, we want to store data in their natural data types, and want all the data type conversions routines to be shared. We could use packages like `react-numeric-input` and `react-datepicker` for this.
* For the components that have to be edited, we take the approach of disjoint state. In this approach component is controlled as long as the user is not editing it, and when it's being edited, we'll make it an uncontrolled component. Once the user is finished with editing the two values will be brought in sync.
* For the changes we make in the input components to take effect in the parent component we have to call the parent `onChange`. We will call this when the input loses focus using the element's `onBlur` property.
* While calling the parent's `onChange()` we’ll pass the value in the natural data type as a second argument. This is so that the parent handle the original event (the first argument) of onChange() if required.
* The best way to tacke the issue where the state remains the old one when the props of the component has changed is to assign a key property to the component that changes when a new issue is loaded. React uses this property to indicate that a component object cannot be reused if the key is different and a new one has to be constructed.
* To store the validity status of each of the inputs in a state variable we have to add a new method called `invalidFields`. Initially, we have to set the state variable to an empty object for any new issue that's being loaded.
* To pass in the `tag` property in the component, we have to use `React.createElement()` instead of using JSX as the tag name is a variable while rendering. 
* To update one or more fields in the document we can use MongoDB `update` command and use the `$set` operator to set the new values of field.
* The fields that cannot be changed from the issue object need to be stripped off and copied.
* To add a button to update a single field, it needs to initiate an action that can be a function passed in as a callback in the props. The callback needs to passed from `IssueList` via `IssueTable` to `IssueRow`. To identify which issue that action has to be applied on, we also have to receive a index of the issue in the table as another value in the props. We use this method for Update and Delete operation.
* When we delete an issue, we move it to the `trash` in a new collection called `deleted_issues`. To achieve this, we’ll retrieve the issue based on the given ID from the issues collection, add the deleted field, save it to deleted_issues, and then delete it from the issues collection.

### Errors and Issues

* In some places throughout this chapter, instead of a pair of single quotes `''` to represent an empty string, a double quote has been used. 
* Similar to chapter 9, I had to make a small change in `IssueEdit.jsx` to make the code work on recent versions of GraphQL. I had to replace the line `const data = await graphQLFetch(query, { id });` to `const data = await graphQLFetch(query, { id: parseInt(id, 10) });`.
* The date validation described in the book doesn't work in Chrome. When we enter a invalid date like `123456` it was not caught and the page doesn not render. It can be fixed by changing the unformat method. We change the code to 
```
function unformat(str) {
    const isDate = str.match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/);
    return isDate ? new Date(str) : null;
}
```

## Chapter 9

![ch09](/readme_images/Chapter9.png)

* We need `routing` to navigate between different views of the application.
* It has to have the following properties:
    * The user can use the forward/back buttons of the browser to navigate between visited pages of the application.
    * Individual pages can be bookmarked and visited later.
    * Links to views can be shared with others.
* There are 2 ways to make connection to something that the browser recognizes:
    * Hash Based: the #(anchor) portion of the URL can be interpreted as a location and this location then determines what section of the page is displayed.  
    * Browser History: It lets JavaScript handle the page transitions, at the same time preventing the browser from reloading the page when the URL changes.
* To switch between different components based on the hyperlink React Router uses a component called `Route`. It takes in as arguments the path that the route needs to match, and the component that needs to be shown when the path matches the URL in the browser.
* To indicate that only one of the components needs to be shown the routes should be enlosed in a `<Switch>` component.
* Difference between matching in Express router and React Router is that:
    * In Express, the match is exact by default, and an * has to be added to match anything that follows.
    * In Express, a route match stops further processing, whereas in React Router, a <Switch> is explicitly needed to make it stop at the first match.
* Parameters can be specified in the route path by using the : character followed by the name of the property that will receive the value. Via props, all routed components are provided a `match` object that contains the result of the match operation and this `match` contains a field `params` that hold the route parameters.
* Query parameters can be used to pass a query through the URL to filter, sort and pagination. 
* The React Router supplies as part of props, `location` object which includes the path(in the field `pathname`) and the query string(in the field `search`). React Router leaves it to the application to determine how to  parse these fields.
* React Router provides a convenient way to create links via `Link` component. It has the following differences with `href`:
    * The paths in a Link are always absolute; it does not support relative paths.
    * The query string and the hash can be supplied as separate properties to the Link.
    * A variation of `Link` and `NavLink` is capable of figuring out if the current URL matches the link and adds a class to the link to show it as active
    * A `Link` works the same between different kinds of routers, either using the # character, or using the path as is.
* `NavLink` allows us to highlight the currently active navigation link based on the path that partially matches with URL's path based on the segments separated by a /. It only adds a class `active` when the link matches the URL.
* React Router has a property `history` which can be used to set the browser URL's location, query string, etc.
* We have to use a wrapper function provided by React Router called `withRouter()` when the component is not directly in the path of any route. The function takes in a component class as an argument and returns a new component class that has `history`, `location` and `match` available as part of `props`. 
* In `nested routes` the beginning part of the path depicts one section of a page, and based on interaction within that page, the latter part of the path depicts variation, or further definition of what's shown additionally in the page.
* At any point in the hierarchy of components, a Route component can be added which will be rendered if the URL matches the route’s path using the `dynamic routing` philosophy of React Router.
* Unlike Express routes, React Router’s routes don’t all need to be predeclared, they can be placed at any level and are evaluated during the process of rendering.
* The disadvantage of hash-based routing is that when the server needs to respond to a different URL path, the browser makes a request to `/` from the server, regardless of what follows the `#` or the actual routing path.
* The switch to using this new router is as simple as changing the import statement and using `BrowserRouter` instead of `HashRouter`. This component achieves routing by using the HTML5 history API (pushState, replaceState, and popState) to keep the UI in sync with the URL.
* When we use Browser History Router, if what follows the `#` is different, it assumes that it's just an anchor within the page and a request is made to `/` regardless of the route's path and the server responds with the entire page.
* In the implementation with Browser History Router, HMR calls fail when we change a souce file when we are at a location such as `/edit/1` or `/issues/`. To get the correct request we use `publicPath` to fetch update information.  

### Errors and Issues

* I was getting an error `INTERNAL_SERVER_ERROR: Variable "$id" got invalid value "1"; Expected type Int. Int cannot represent non-integer value: "1"` while implementing the Nested Routes. To fix it, I had to make a change in the code in page 256. I replaced `const data = await graphQLFetch(query, { id });` with `const data = await graphQLFetch(query, { id: parseInt(id, 10) });`.

## Chapter 8

![ch081](/readme_images/Chapter8_1.png)

![ch082](/readme_images/Chapter8_2.png)

* Using Webpack we can split the front-end code into component based files, inject code onto the browser incrementally and refresh the browser automatically on front-end changes.
* The `require()` element is a function that can be used to import symbols from another module. The parameter passed to require() is the ID of the module.
* For packages installed using npm, this is the same as the name of the package and the same as the sub-directory inside the `node_modules` directory where the package’s files are installed. For modules within the same application, the ID is the path of the file that needs to be imported.
* Whatever is exported by other.js will be available in the other variable. This is controlled by `exports`.
* We separate the different functionalities from `server.js` and them using `require` import them in `server.js`.
* Using, Webpack dependencies can be defined using statements. The tool then automatically determines the application's own dependent modules and third party library dependencies. It has a single pipeline to transform, bundle, and watch for changes and generate new bundles as fast as possible.
* We will modularize the client-side code using Webpack.
* In the front-end we use `import` statement instead of `require`.
* Weback can combine the steps of Babel transform and then putting the files together by using helpers called `loaders`. To run Babel transforms we need Babel loader.
* Each React component should be placed in it's own file, especially if the component is a stateful one. The stateless components can be combined with other components.
* We install the third party libraries that we had earlier included directly from a CDN.
* NPM can be used for server-side libraries as well as client side ones. Webpack understands this and can deal with client side libraries installed via npm.
* Using an optimization called `splitChunks` in Webpack we can have two bundles, one for application code and another for all the libraries.
* Hot Module Replacement can be used to detect changes and recompile the files. It saves time by updating only when its changed, and it removes the need for switching windows and refreshing the pages.
* Webpack gives us source maps, that connects the line numbers in the transformed code to the original code. This can be used for debugging as breakpoints in the original code are converted to breakponts in the transformed code. We us `source-map` which is the most accurate(and slowest) tool for this.
* Instead of injecting the environment variables in the front end we could generate a bundle that replaces the variables wherever it needs to be replaced. Webpack uses `DefinePlugin` for this. This method's disadvantage is that, we have to create different bundles for different environments and a change in the server configuration cannot be done without making another build.
* To optimize the page load time for applications, we should split the bundles into smaller pieces, and load the bundles only when required using lazy loading.
* To prevent browser caching the JavaScript bundle, we need to change the name of the script file if the contents have changed.

### Errors and Issues

* On page 204 the author has imported `graphql_date.js`. It actually should have been `./graphql_date.js`. The correct change has been given on page 206.
* On page 216 and page 226, in the code `ReactDOM.render(element, document.getElementById('contents'));`, it should have been `content` instead of `contents`.
* On page 227, the line `devtool: 'source-map'`  raise an ESLint error as a trailing comma is missing at the end.

## Chapter 7

![ch071](/readme_images/Chapter7_1.png)

![ch072](/readme_images/Chapter7_2.png)

* In this chapter we organize our code, and make it more flexible so that it can cater to a larger application with lot of traffic.
* UI Server
    * Our Express server serves static content as well as API calls.
    * All the requests land on the same physical server within the Express application and are routed into two different middleware based on the request.
    * As the application grows, the API will have other consumers and the two parts will have different scaling requirements. Also, it will be hard to diagnose and debug performance issues. So the better option is to separate it into two servers.
* To keep the variables for ports flexible we use `dotenv` to supply environment variables stored in configuration files. We can use any environment variable using process.env properties. The values of the environament variables should be declared in a `.env` file in the root during development.
* `cross-origin resource sharing` or CORS is the mechanism of determining if the request can be allowed.
* In our application we don't disable unauthenticated requests across origins. We can change the UI to make even API requests to the UI server, and then using proxy that request will be routed to the API server.
* ESLint is a flexible linter that lets us define the rules that our code should adhere to. The rules can be defined in the `.eslintrc` file, which is a JSON specification. 
* Rule sets can also be inherited using the `extends` property.
* In the api we just need to install the `airbnb-base` package, but in the UI we require the complete Airbnb configuration including the React plugin.
* The ESLint can be run using the command `npx eslint`.
* In the UI, we don't need to run ESLint on all the sub-directories. The compiled file in the `public` directory will cause errors because it is not source code. We can ignore this file by adding `--ignore-pattern public` to the command line script or add them as lines to a text file called `.eslintignore`.
* In the `src`folder in the ui we extend the complete `airbnb` so that we can configure the React code. To check React code with ESLint, we run it using the command `npx eslint . --ext js,jsx --ignore-pattern public`. 
* We can supply specification in the form of `propTypes` to validate the properties being passed from one component to another.  

### Errors and Issues

* `npm install` was showing an error: `apollo-graphql@0.4.5 requires a peer of graphql@^14.2.1 but none is installed. You must install peer dependencies yourself`. I had to specify a graphql version to `14.2.1` in api's package.json to fix it.
* I made a mistake of naming the `.env` file as sample.env. The values that I had defined in it were not accessible in the code. Renaming it to `.env` fixed the issue.
* While using ESLint I got an error `Expected linebreaks to be 'LF' but found 'CRLF'  linebreak-style`. This was an error that was coming because I was using Windows. To fix this I added a rule(` "linebreak-style": ["error","windows"]`) in the `.eslintrc` file.

## Chapter 6

![ch06](/readme_images/Chapter6.png)

* MongoDB is a document database, an entire object is written as a `document`. A `document` is a data structure composed of field and value pairs.
* MongoDB supports Boolean, numbers, strings, dates, timestamps, regular  expressions, and binary data.
* `Collection` is a set of documents. 
* In MongoDB it's mandatory to have a unique primary key. It has a reserved field name `_id`. If we don't provide a value while creating the document, the primary key is auto-generated. It has a special data type called `ObjectId`. When we provide a id it's stored as an integer, but when it is auto-generated the data type of id is `ObjectID`
* Database is a logical grouping of collections.
* `$lookup` is an aggregation pipeline equivalent to `join` in SQL databases.
* In MongoDB query language the main read and write operation are the CRUD methods.
* I downloaded the  MongoDB Enterprise Edition for Windows. To use MongoDB I had to go to `C:\Program Files\MongoDB\Server\4.2\bin\` directory and run `mongo.exe` or run `C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe` in cmd.
* Then I created a directory `\data\db` for the database in `C` drive.
* Mongo shell has an auto-complete feature that can be availed by pressing tab twice after typing `db.employees.`.
* `find()` method takes in 2 arguments. First is the filter and second is the projection.
* `createIndex()` take in 2 arguments. The first is the filter, and the second is an object that contains various attributes of the index(like unique).
* Projection specifies which fields to include or exclude in the result. It's format is an object with one or more fields as the key and value as 0 or 1. It can start with nothing and include fields using 1, or start with everything and exclude fields using 0s.
* `updateOne()` and `updateMany()` are the two methods available for updating a document. It takes 2 arguments. The first argument is filter, and the second is an update specification if only some fields need to be changed.
* The method `replaceOne()` can be used to replace the complete document.
* `aggregate()` performs the function of GROUP BY clause. To perform aggregate, the `$group` stage needs to be used. To group the aggregate by a field, we specify the name of the field prefixed by a `$` as the value of `_id`.
* To connect with the MongoDB server we import the `MongoClient` object, then create a new client object and finally call the connect method on it.
* The `connect()` method is an asynchronous method and needs a callback. Within the callback, a connection to the database can be obtained by calling the `db` method of the `client` object. 
* The most recommended and convenient way to use the driver is using async/await paradigm. We use `await` before the method call to simulate the synchronous call by waiting for the call to complete and return the results.
* Mongo shell is built on top of a JavaScript engine.
* To perform the read operation, we need to connect to the database. We maintain the connection so that it can be reused for many operations. Next, we need to setup the server to connect to the database and then start the `Express` application.  
* To perform the write operation, we need to first generate a sequence of numbers that cannot give us duplicates. Then, insert the issue object in the database.

## Chapter 5

![ch05](/readme_images/Chapter5.png)

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
* JSON does not have a `Date` type. We use a string format for transferring `Date` object to JSON.
* The method `serialize()` will convert date value to string. We need to call `toISOString()` method to convert date to the ISO 8601 string format.
* Reviver function is called for parsing all values, and the JSON parser lets it modify the default parser's functionality.
* The method `parseLiteral` is called when the field is specified in place in the query. The argument `ast` contains a `kind` and `value` property that indicates the type of taken.
* The method `parseValue` is called if the input is supplied as a variable. The date is constructed out of the variable and returned.
* GraphQL can factor dynamic values(`variables`) from the query and pass them as a separate dictionary.
* To use variables we need to specify a name for the operation right after the `query` or `mutation` field and declare a variable as argument to the operation name. The variable name can then replace the value. The variable name should start with a `$` character.
* In GraphQL we can restrict the input values using an `enums`. Default values can be provided by using the `=` symbol.
* To print out the error on the console we can use the configuration option `formatError` available in the Apollo Server. Using this we can make changes to the way error is sent back.

### Errors & Issues

* The setup of `apollo-server` was showing an error `Error: Cannot find module 'graphql/validation/rules/PossibleTypeExtensions'` with the command in page 97. After going through the posts on piazza, I installed the version to 2.3+ using the command `npm install graphql@0 apollo-server-express@2.3` which fixed the issue.
* I made a lot of typos in this chapter which took some time to debug.
* The function `issueValidate(issue)` was wrongly named as `validateIssue(_, { issue })` in page 125. 

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