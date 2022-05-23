import LayoutBase from 'layouts/LayoutBase';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'store/provider';

import menus from './configs/menus';

function App() {
  return (
    <Provider>
      <Router>
        <LayoutBase>
          <Switch>
            {menus.map(({ children }) => {
              return children.map(({ path, component, exact }, index) => (
                <Route key={index} path={path} exact={exact} component={component} />
              ));
            })}
            <Redirect to="/" />
          </Switch>
        </LayoutBase>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
