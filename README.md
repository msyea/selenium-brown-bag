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

### Set up Selenium
The easiest way is to use docker compose and selenium standalone as per `docker-compose.yml`.

Docs: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/

### How to run the tests

```
npm run test:selenium
```

### Timing issues

Be very careful with helpers and waiting for assertions

We had race conditions we had great difficult trouble shooting

### Shared state

Be careful with sharing `WebDriver` across sessions. Try commenting-out `await alert.dismiss()` on `test/run.test.js#L41` and see what happens. Changing `(before|after)All` to `(before|afterEach)`.

### HTTPS and the Browser Sandbox

As backend services people we often don't worry about the strict browser sandbox. CURL doesn't mind.

Be careful with domain names. For some reason http://app:3000 diddn't work but http://demo:3000 did. I suspect it's to do with default HSTS and dangerous URL blacklisting.

When migrating to self-signed certificates for testing we had issues generating  a valid x509v3 for Chrome. The issue was an underscore in the name! And using DNS name extensions.

### Internet Exploere and real devices

Due to the Microsoft Licensing and the limitations of headless testing (they need a GUI) a docker image of Internet Explorer is unavailable. The solution is to either run it locally (if on Windows) or use a selenium service... like Sauce Labs 👇.

### Saucelabs

https://app.saucelabs.com

### How to run the tests in Sauce Labs

Toggle the commented-out code in `test/run.test.js` and change the `dadarek/wait-for-dependencies` `command` to `sauce-connect:4445` (note the different port!) in `docker-compose.yml`.

```
SL_USERNAME=username SL_KEY=api_key_not_password npm run test:selenium
```

### Performance

When sharing an environment like Sauce Labs you have additional issues: concurrent sessions and duration. If you run out of resources (like another pipeline runs it's tests) your tests will fail. Be prepared to rerun them again. You can decrease the chance of conflicts by performance turning.

1. Make test environment publically accessible so you don't have to use sauce-connect
2. Use EU data centre (it's closer and quicker) (we had to fork `henrrich/docker-sauce-connect`) to enable this
3. Run tests in different browsers, in parallel (potential downfall: if using stubs this can share state 😢)