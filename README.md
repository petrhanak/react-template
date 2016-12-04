#React template

[![Build Status](https://travis-ci.org/petrhanak/react-template.svg?branch=master)](https://travis-ci.org/petrhanak/react-template)

##Installation

```
git clone https://github.com/petrhanak/webpack-server-build-demo.git
npm install
npm run start
```

1. open `http://localhost:4000` in your browser
2. edit something in `src/client/components`
3. ...
4. profit

## Features
- **hot reload** - both client and server are updated within few miliseconds, without restart
- **serving assets** - with `dev-middleware` on development and `serve-static` on production
- **less hacky** - no need for `babel-register` or `webpack-isomorphic-tools`
- **full webpack power** - files are transpilled with webpack which means you can use css modules and all fancy stuff like `import template from './layout.pug'`
- **production ready** - after some testing it should be reliable solution

## Credits
inspiration taken from article [Don't use nodemon by Kevin Simple](https://medium.com/@kevinsimper/dont-use-nodemon-there-are-better-ways-fc016b50b45e)