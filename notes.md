//for testing in react with jest we do not need any extra packages
unless we required for a reason (like if using typescript - @testing-library/jest-dom)

///settup your on server in 5mins with
creating a file db.json
and adding the posts in it.
in package.json

- "json-server": "json-server --watch db.json --port 3002";
  -npm run json-server

//testing
-describe(')-folder
-it('') , test(")-file
//we can make a seprate folder for testing purposes or we can make each testing file besides the component file itself

in testing for organizing
//////now to test react comp we need react-testing-library (which is already settuped in react)

// querryByTestId (so it will search if not found then return null)
// getByTestId (it will search but if not found it will break all the tests)
// findByTestId(after api call when the dom is rerendering)

//mocking is like returning the desired value on through the packages

// #As we do mocking frequently and inorder to avoid code duplication we need to add that code in settup.Tests.js which will be globally available in all tests.

//install msw for making a mocked server test
