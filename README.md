# selenium-brown-bag

## What is Selenium
> Selenium is a suite of tools to automate web browsers across many platforms.

## Why do we use it
When executing javascript in the browser we cannot control what browser/engine is used.

https://kangax.github.io/compat-table/es6/

### Different browsers use different engines and they have difference ES6 compatability scores

Browser       | Version | Engine         | Score
--------------|---------|----------------|------
Chrome        | 74      | V8             | 98%
Edge          | 18      | Chakra         | 96%
Firefox       | 66      | SpiderMonkey   | 98%
Safari        | 12      | JavascriptCore | 98%
Safari Mobile | 12      | JavascriptCore | 98%

In order to ensure we have a great experience across all devices we have to test across all devices. It's not as simple as testing in Node 12 😢.

### How to do it

Set up selenium
The easiest way is to use docker compose and selenium standalone.