# Core-Radio

Core-Radio is an implementation of the Publish/Subscribe pattern.


## Getting started

```bash
# install dependencies
npm install

# Clone, install and link local dependencies
# Follow the instructions on the README file
git clone git@bitbucket.org:nnjs/core-types.git
npm link core-types

# link the package
npm link
```

## Example

```javascript
import CoreRadio from 'core-radio';

// subscribe to an event
let eventToken = CoreRadio.subscribe('foo:bar', context => {
  console.log(context.message);
});

// publish an event
CoreRadio.publish('foo:bar', { message: 'Hello world' });

// remove subscription to an event
CoreRadio.unsubscribe('foo:bar', eventToken);
```


## Test

```bash
npm run test
```


## Documentation

- [Overview](/docs/overview.md)