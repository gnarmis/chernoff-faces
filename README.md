# Chernoff Faces

Exploring [Chernoff faces][3]!

Imagine visually comparing election results as they're rolling in on election
day. You want to see how things like voter turnout, dem-to-repub ratio, votes
counted, etc compare across a few select states. There are a number of
separate categories (states) and lots of variables for each one, each with
their own range of possible values.

Very quickly, things gets complicated and hard to follow.

One possible solution is to leverage our adeptness at facial recognition
by representing a subset of those voting variables as facial features on a set
of faces, where each face represents a state.

This project aims to make producing and manipulating Chernoff faces easy.

## Usage

Just open `public/index.html` in a browser.

## Development

* `./bootstrap.sh`

OR...

* `brew update && brew install node`
* `npm install`
* `npm install -g bower`
* `bower install`


Then,


Launch the server using `npm start`. Then, go to `localhost:8080/index.html`.
You can also open this main page with `npm run index` after the server is
running.

Other details:

* Launch static server: `npm start`
* Open the main html page: `npm run index`
* Run tests `npm test`
* Build out the client side bundle (if any changes in `lib/`): `npm run build`

* Launch basic REPL: `npm run repl`
* Learn about all scripts: `npm run`


## Documentation

See `doc/development_log.md` for notes on the development of this project.

Also, see `doc/arch` for a sequential list of files with architecture
decisions listed.

## To Do

Test it with a complex example?


## Credit

Thanks to [Lars Kotthoff](http://www.larsko.org/HomePage) for the chernoff d3
plugin!



[1]: https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore
[2]: http://www.wolfe.id.au/2014/02/01/getting-a-new-node-project-started-with-npm/
[3]: https://en.wikipedia.org/wiki/Chernoff_face
