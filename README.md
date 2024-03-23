
# TIMETONIC TEST

This is an programming test for the Android developer role at Timetonic. The description of the test is as follows:

Create a simple Android application that includes a login page, a landing page, and
fetches and displays a list of books using Timetonic's public API.

### Technologies

- React-Native: Framework for the quick creation of Android applications through Javascript
- React-Native-Paper: Library of UI components for React-Native following Google's Material design guidelines
- Typescript: Javascript plugin for using static typing.


# How to run
## Add an API key

Generate an app key in the Timetonic API and add it to ./src/Config.js in the TIMETONIC_KEY variable.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

