import {BrowserRouter} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import MyRoutes from "./Myroutes";
import { makeStyles } from 'tss-react/mui';
import Footer from "./components/Footer";
import Alert from "./components/Alert";

function App() {
  const useStyles = makeStyles()(() => {
    return{
      App: {
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh",
    }
  };
  });

const { classes } = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <MyRoutes />
        <Footer />
        
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
