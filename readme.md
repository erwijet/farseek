
![npmDownloads](https://img.shields.io/npm/dt/farseek.svg?logo=npm&style=flat) ![npmVersion](https://img.shields.io/npm/v/farseek.svg) ![GitHub last commit](https://img.shields.io/github/last-commit/erwijet/farseek.svg?logo=github)
## Description
Farseek is a command-line tool that aims to subdue the pain of external file including with web development. Farseek uses [JsDelivr](http://www.jsdelivr.com) to generate CDN paths. 


## Basic Usage

To refrence a path to an npm package, use
`farseek npmjs <package> <path>`
As an example, to refrence the [bulma](npmjs.org/bulma) css framework, simply use
`farseek npmjs bulma css/bulma.css`
This will copy the HTML link tag to the clipboard.

To refrence a file hosted on a github repo, use
`farseek github <user> <repo> <path>`
As an example, to refrence `farseek.js` hosted on github, simply use
`farseek github erwijet farseek src/farseek.js`
This will also copy the HTML link tag to the clipboard.

## Formatting
If you desire to *not* use HTML, you can use the `-f` or `--format` flag to specify the format you prefer your link to be coped in.

**As of right now, only HTML and pug/jade formats are supported. Feel free to for and add support, or submit an issue on Github**

To refrence a file for Pug, use
`farseek npmjs -f pug bulma css/bulma.css`
which would copy  `link(rel="stylesheet", href="http://cdn.jsdelivr.net/npm/bulma@latest/css/bulma.css")` to the clipboard

## Logging Output
If you would prefer to log the generated link to the console, insted of to the clipboard, use the `-l` or `--log` flag.

## The Known database
 The Known database is a collection of commonly used resources that exist to make refrencing them much easier with farseek.
 
 **Fetching from Known**
 To use a path stored in the Known database, use the `-g` or `--get` option, followed by the path name.
 To use the [bulma](npmjs.org/bulma) example again, `farseek known -g bulma`would fetch the path for the bulma css framework.

**Adding to Known**
In the event that you come across a resource that you would desire to use, and it is not already in the Known database, you can use farseek to add the resource using the `-a` or `-add` flag followed by the name you wish to use to represent the resources, an '@', then the path for the package.

To use the p5.js library as an example,
`farseek known -a p5js@https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js`

**Removing from Known**
Really guys, please be mature. Currently, access for path removal is public in the event you add a path name that you meant to be named something different. 
In the event this tool is abused, removal will be changed to either a modification feature, or a permission-based removal system. If you have an idea for clever implemention, feel free to pull and add it. I'll add the user to a contributions section of this readme. Anyway, enough about that. To use the removal feature, use either the `-r` or `--remove` flag followed by the path name.

To remove the p5.js instance in the Known database, use `farseek known -r p5.js`

## Misc.
- To find the current version of Farseek you are using, use `farseek -V`
- To get the help menus, use `farseek |npmjs|github|known| --help`     

## Follow Me!
![YouTube Handle](https://img.shields.io/badge/YouTube-erwijet-red.svg?logo=youtube) ![enter image description here](https://img.shields.io/badge/Snappy_Chatty-tyler187xxt-yellow.svg?logo=snapchat) ![enter image description here](https://img.shields.io/badge/Github-erwijet-green.svg?logo=github) ![enter image description here](https://img.shields.io/badge/Instagram-@erwijet-ff69b4.svg?logo=instagram)   