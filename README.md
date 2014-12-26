# Tongue In Cheek

Exploring [Chernoff faces][3]!


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
```


[1]: https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore
[2]: http://www.wolfe.id.au/2014/02/01/getting-a-new-node-project-started-with-npm/
[3]: https://en.wikipedia.org/wiki/Chernoff_face