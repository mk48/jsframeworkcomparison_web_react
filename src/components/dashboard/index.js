import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import Company from "./company";
import "./dashboard.css";

class Dashboard extends React.Component {
  constructor() {
    console.log("in constructor()");
    super();
    this.state = { companies: [], isError: false };
    this.socket = null;
  }

  componentDidMount() {
    this.socket = socketIOClient("http://localhost:3001/");
    this.fetchData();
    this.setupSocketConnection();
  }

  componentWillUnmount() {
    this.socket.close();
  }

  fetchData = async () => {
    const res = await fetch("http://localhost:3001/companies");
    res
      .json()
      .then((res) => this.setState({ companies: res }))
      .catch((err) => this.setState({ isError: true }));
  };

  setupSocketConnection = () => {
    this.socket.on("newStockValues", (data) => {
      console.log("Getting data");
      const companiesLatestUpdated = this.state.companies.map((comp) => {
        const dataForThisComp = data.find((d) => d.id === comp.id);
        if (dataForThisComp) {
          return dataForThisComp;
        } else {
          return comp;
        }
      });
      //update local company values
      this.setState({ companies: companiesLatestUpdated });
    });
  };

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <hr />
        <div className="companyBox">
          {this.state.companies.map((comp) => (
            <Company key={comp.id} name={comp.name} stock={comp.stock} />
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
