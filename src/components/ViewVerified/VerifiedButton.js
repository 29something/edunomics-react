import React, { Component } from "react";
import "../Test/Test.css";
import { NavLink, Link } from "react-router-dom";
export class VerifiedButton extends Component {
  render() {
    return (
      <div>
        <div className="custom-btn-lists">
          <ul>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/VerifiedParticle"}
                >
                  Particle Size
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/VerifiedTestEight"}
                >
                  Flakiness Index
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/VerifiedTestSeven"}
                >
                  Elongation Index
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/VerifiedTestOne"}
                >
                  Slit Content
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/VerifiedTestTwo"}
                >
                  Gravity and Water abs
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/VerifiedTestThree"}
                >
                  Surface Moisture
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/VerifiedTestFour"}
                >
                  Compaction
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/VerifiedTestFive"}
                >
                  Crushing
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/VerifiedTestSix"}
                >
                  Bulk Density
                </NavLink>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default VerifiedButton;
