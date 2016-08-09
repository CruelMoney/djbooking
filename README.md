# Hello
This project is build using ES6 with Babel and Webpack.
The core libraries used are React and Redux. 

Install dependencies using <code>npm install</code>
Run Webpack dev server using <code>npm run start</code>

The folder structure is as follows:

```
root
│   index.html
│   ...   
│
└───assets
│
└───output   
│   
└───src  
│   │   App.js
│   │
│   └───actions  
│   │
│   └───components
│   │   │
│   │   └───blocks
│   │   └───common
│   │   └───pages
│   │    
│   └───constants
│   │    
│   └───containers
│   │    
│   └───css
│   │    
│   └───reducers
│   │    
│   └───utils
```

The react components are in three folders. 
Common are the smaller components that are used a lot. 
Blocks are bigger components build using the common components. 
Pages are components build using the blocks, and each represent a route on the website. 
The App.js is the entry point and defines the routes using the pages.

The actions folder contains all the actions creators used by redux. 
The container-files connects the react components to the redux store. 
In the reducers folder all the redux reducers defines the redux store. 
