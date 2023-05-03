import "./App.css";
import MainPageCompnent from "./main";
import { Switch, Route } from "react-router-dom";
import ProductPage from "./product";
import UploadPage from "./upload";

function App() {
  return (
    <div>
      <Switch>
        <Route exact={true} path={"/"}>
          <MainPageCompnent />
        </Route>
        <Route exact={true} path={"/product"}>
          <ProductPage />
        </Route>
        <Route exact={true} path={"/upload"}>
          <UploadPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
