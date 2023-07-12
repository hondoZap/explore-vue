# Project_Template

## Running the API

1. Download the configuration folder for the `template-web` service in the `project-template` Labretto context and unzip it to `C:\Labatt` (`/labatt` on Linux).

2. Run the following commands in a terminal:

```sh
cd project-template-api/ProjectTemplate
dotnet watch run
```

## Running tests

```sh
cd project-template-api/ProjectTemplate.Tests
dotnet watch test
```

- To run the tests just once, remove the word `watch`
- To run just one test or all tests in a given class, add `--filter YourTestName` or `--filter YourTestClass`

3. If you get an error about a missing configuration file, inspect the error message to see which file path the toolkit is looking for. Make sure your Labretto `configuration.json` is in the right folder path.

## Running the UI

See [the README in the ui folder](./project-template-ui/README.md) for instructions on running the UI or its tests.
