# Tongue In Cheek

Exploring [Chernoff faces][3]!

## Installation

* `brew update && brew install node cairo` (`cairo` is required by `Paper.js`)
* `npm i`
* `npm i -g bower`
* `bower i` (This installs frontend javascript components)

## Usage

* Launch REPL: `npm run repl` or `npm start` (for now)
* Run tests: `npm test`
* Launch static server: `npm run server`
* Open the main html page: `npm run index`
* Open the html page where we visualize things: `npm run display`
* Other scripts: `npm run`

Launch the server using `npm run server`. All important links are accessible from `localhost:8080/index.html`. You can also open this main page with
`npm run index`.

## Documentation

See `doc/development_log.md` for notes on the development of this project.

Also, see `doc/arch` for a sequential list of files with architecture
decisions listed.


[1]: https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore
[2]: http://www.wolfe.id.au/2014/02/01/getting-a-new-node-project-started-with-npm/
[3]: https://en.wikipedia.org/wiki/Chernoff_face
