// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

import {
  // ListItem,
  // List,
  // Box,
  // Link,
  // Drawer,
  // DrawerOverlay,
  // DrawerContent,
  // DrawerCloseButton,
  // DrawerBody,
  // DrawerFooter,
  // Button,
  // DrawerHeader,
  // Input,
  useColorMode,
  useTheme,
} from "@chakra-ui/core";
// jest.mock("react-query");
jest.mock("@chakra-ui/core", () => {
  const modules = jest.requireActual("@chakra-ui/core");
  return {
    _esModule: true,
    ...modules,
    useColorMode: jest.fn(),
    useTheme: jest.fn(),
  };
}); //telling to only moke the imports from the file instead of all the modules

useColorMode.mockReturnValue({
  colorMode: "dark-mode",
});
useTheme.mockReturnValue({});
