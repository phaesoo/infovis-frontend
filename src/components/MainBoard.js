import React from "react";
import _ from "lodash";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { GlobalHotKeys } from "react-hotkeys";
import sc from "styled-components";

import PMPerformance from "components/line/pm_performance/PMPerformance"

const TabBody = sc.div`
display: block;
margin: 0 auto;
width: 80%;
`;

const keyMap = {
  TAB_TIMESERIES: "1",
};

const panels = [
  "timeseries",
]

class MainBoard extends React.Component {
  handlers = {
    TAB_TIMESERIES: event => this.setState({ tabIndex: 0 }),
  }

  state = {
    tabIndex: 0,
  }

  generateDOM() {
    return _.map(panels, function (i) {
      return (
        <TabPanel key={i}>
          <TabBody>
            <PMPerformance />
          </TabBody>
        </TabPanel>
      )
    })
  }

  render() {
    return (
      <GlobalHotKeys keyMap={keyMap} handlers={this.handlers}>
        <Tabs selectIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList>
            <Tab>Line[1]</Tab>
          </TabList>
          {this.generateDOM()}
        </Tabs>
      </GlobalHotKeys>
    )
  }
};

export default MainBoard;