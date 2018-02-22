# This is a very simple angular 4.x seed project for a blog without a database
## (It will be an angular 6.x project in a matter of months)
## set up
### fork and clone this repository

## NOTE WELL

The package versions in this bootstrap project *are not pinned*.  When you use them in your own project, you will want to pin the versions of the dependencies in `package.json`.

Pinning a version means removing the semver symbols (^ or ~) that precede the version number.  Leaving a package version unpinned means you are susceptible to breaking code in an automatic upgrade to one of these packages.

And that's pretty annoying.

`npm` makes use of `package-lock.json`, the purpose of which is to
>> Describe a single representation of a dependency tree such that teammates, deployments, and continuous integration are guaranteed to install exactly the same dependencies.

### install
Go to your new local directory.

`npm install`

or

`gradlew npmInstall`

### Either build

`gradlew rebuild`

### Or build with a minified codebase

`gradlew rebuildMin`

### start the local server

`node server`

When you run locally, you have to build first.  Yeah.  I don't like running the server on the source files.  If we're going to serve the code, it should be on the code in its distributable form.  I don't see how it's a reliable test, otherwise.

#### check it out in the browser

after you start the server, go to http://localhost:4453/index.html .

## Some notes on the project
### why gradle?
CI with Jenkins.  That's the long and the short of it.  One of the best things about gradle is that you can put it on an empty disk, run `gradlew [task]` and the gradle wrapper will find the version of gradle specified in the wrapper task (I specified 2.11 for this project), download it, and run it.

On the CI box, we want to run `gradlew npmInstall` first.

Travis, CircleCI, even Team City, we'll get to those as we need them.  Right now, Gradle in groovy is our CI build tool.

### Bundled codebase
Generally people associate the packed and minified code bundle with webpack.  We don't use webpack, but we get the packed, minified bundle anyway using SystemJS bundler and gulp.

Works great, but we may move to webpack nonetheless.  As the Angular team moves from Angular-cli to the planned Angular SDK, we expect to evolve as well.
