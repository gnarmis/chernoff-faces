# Tongue In Cheek

Exploring [Chernoff faces][3]!

## Installation

* `brew update && brew install node`
* `npm i`

## Usage

* Launch REPL: `npm start`
* Run tests: `npm test`

## Dev Log

- Found out about [Node.gitignore][1]. Also, Mark Wolfe [talked about a
  systematic way to start new projects][2]. But, I can't find the equivalent of
  `lein new [project-name]`... which sets up whole directories and a testing
  apparatus.

- I'm just gonna note down what I did (in the order I wish I had done it):

    ```
    $ mkdir new tongue-in-cheek
    $ git init
    $ mkdir src spec
    $ touch README.md .gitignore src/main.js spec/main_spec.js
    $ wget https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore -O .gitignore
    $ npm init
    $ npm i mocha --save
    $ npm test # should be green
    $ git add . && git commit -a
    ```

- There are a number of functional programming libraries in Javascript. There's
  `fn.js`, `functional.js`, `mori`, and Oliver Steele's `functional` ([details][4]).
  I picked Oliver Steele's because it looked like it would lead to compact, easy
  to read and write code. Used a [node port][5] for that lib.

- Picking up my Ruby habit of having a `config/boot` module. Hmm, functional-
  node has a [weird looking shim][6]... I've seen something similar before,
  but this is the clearest example.

    ```javascript
    //node.js shim
    exports.load = function (parent) { return (function (window) {
    // random javascript
    })(parent || global); };
    ```

[1]: https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore
[2]: http://www.wolfe.id.au/2014/02/01/getting-a-new-node-project-started-with-npm/
[3]: https://en.wikipedia.org/wiki/Chernoff_face
[4]: http://osteele.com/sources/javascript/functional/
[5]: https://github.com/bailus/functional-node
[6]: https://github.com/bailus/functional-node/blob/master/node_modules/functional-node/functional.js#L1-L2