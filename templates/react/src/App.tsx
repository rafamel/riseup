import React from 'react';
import { variable, mui } from './theme';
import { injectGlobal } from 'emotion';
import LoadFadeIn from './components/LoadFadeIn';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import store from './store';
import LoadingBar from './components/LoadingBar';
import { observer } from 'mobx-react';

injectGlobal({ ':root': variable.styles });

export default observer(App);

function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={mui}>
        <LoadingBar active={store.loading.isLoading} />
        <LoadFadeIn onLoad={store.loading.ends}>
          <div>React starter</div>
        </LoadFadeIn>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
