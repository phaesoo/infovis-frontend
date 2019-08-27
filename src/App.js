import React from "react";
import './App.css';
import MainBoard from "components/MainBoard"
import "c3/c3.css";


class App extends React.Component {
  componentWillMount() {
    document.title = "InfoVis"
  }

  render() {
    return (
      <div className="App">
        <header>
        </header>
        <body>
          <MainBoard/>
        </body>
      </div>
    );
  }
}

export default App;
