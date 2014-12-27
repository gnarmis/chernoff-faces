# Development Log

- Found out about [Node.gitignore][node-gitignore]. Also, Mark Wolfe
  [talked about a systematic way to start new projects][node-new-projects].
  But, I can't find the equivalent of `lein new [project-name]`... which
  sets up whole directories and a testing apparatus.

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
  `fn.js`, `functional.js`, `mori`, and Oliver Steele's `functional`
  ([details][functional-javascript]). I picked Oliver Steele's because it looked
  like it would lead to compact, easy to read and write code. Used a
  [node port][functional-node] for that lib.

- Picking up my Ruby habit of having a `config/boot` module. Hmm, functional-
  node has a [weird looking shim][shim-eg]... I've seen something similar before,
  but this is the clearest example.

    ```javascript
    //node.js shim
    exports.load = function (parent) { return (function (window) {
    // random javascript
    })(parent || global); };
    ```

- Oh, the project tooling rabbit hole... I want to use Paper.js again (past
  experience  in my [socketyballs][socketyballs] experiment was nice). But it's
  a big honking component so I  should use Bower... and now the installation is
  a bit more complicated, but maintenance  a bit easier.

- Moved files around so that `doc/` contains all documentation and
  `README.md` is thinned out.

- Adopted the "architecture design record" practice; saw [a post][arch-design-records]
  earlier by Michael Nygard. But I don't really need this right now. This log is
  enough.

- I'm going to focus on the non-visulization bits and stick with defining the
  interfaces first. Perhaps try it out with the "smile"/"lips" component?
  Splines?

- Changing the test folder and updating scripts. Just sticking with defaults.

[node-gitignore]: https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore
[node-new-projects]: http://www.wolfe.id.au/2014/02/01/getting-a-new-node-project-started-with-npm/
[functional-javascript]: http://osteele.com/sources/javascript/functional/
[functional-node]: https://github.com/bailus/functional-node
[shim-eg]: https://github.com/bailus/functional-node/blob/master/node_modules/functional-node/functional.js#L1-L2
[socketyballs]: https://github.com/gnarmis/socketyballs
[arch-design-records]: http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions