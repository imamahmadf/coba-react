import Home from "./component/Home";
import Detail from "./component/Detail";
import Add from "./component/Add";
import Edit from "./component/Edit";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Detail} path="/detail/:id" exact />
        <Route component={Edit} path="/edit/:id" exact />
        <Route component={Add} path="/add-product" exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
