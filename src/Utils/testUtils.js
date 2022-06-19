import { render as RTL } from "@testing-library/react";
import React from "react";

// import { useQuery } from "react-query";
import { ColorModeProvider, CSSReset, theme } from "@chakra-ui/core";
// import { ReactQueryCacheProvider } from "react-query";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import * as reactQuery from "react-query";
import { ThemeProvider } from "emotion-theming";

const defaultTheme = {
  ...theme,
};
const { ReactQueryCacheProvider, QueryCache } = reactQuery;

export const renderWithrouter = (component, option = {}) => {
  const queryCache = new QueryCache();
  const history = createMemoryHistory();
  return RTL(
    <ThemeProvider theme={defaultTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Router history={history}>
          <ReactQueryCacheProvider queryCache={queryCache}>
            {component}
          </ReactQueryCacheProvider>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  );
};
export const render = (component, option = {}) => {
  const queryCache = new QueryCache();
  return RTL(
    <ThemeProvider theme={defaultTheme}>
      <ColorModeProvider>
        <CSSReset />
        <ReactQueryCacheProvider queryCache={queryCache}>
          {component}
        </ReactQueryCacheProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
};
