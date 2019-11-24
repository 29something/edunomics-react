import React, { Component } from "react";
import "./Test.css";
import { NavLink, Link } from "react-router-dom";
export class ButtonLink extends Component {
  render() {
    return (
      <div>
        <div className="custom-btn-lists">
          <ul>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/ViewParticleSize"}
                >
                  Particle Size
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/ViewTestEight"}
                >
                  Flakiness Index
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/ViewTestSeven"}
                >
                  Elongation Index
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/ViewTestOne"}
                >
                  SILT
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/ViewTestTwo"}
                >
                  Gravity and Water abs
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/ViewTestThree"}
                >
                  Surface Moisture
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/ViewTestFour"}
                >
                  Compaction
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/ViewTestFive"}
                >
                  Crushing
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-info">
                <NavLink
                  activeClassName="selected"
                  to={process.env.PUBLIC_URL + "/ViewTestSix"}
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

export default ButtonLink;
