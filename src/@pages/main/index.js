import React, { Component } from "react";
import "./index.less";
import { Link } from "react-router";
import FengjingImg from "@assert/img/fengjing.jpg";

export default class Current extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="image-wrapper">
          <img src={FengjingImg} />
        </div>
        <div className="topNav-wrapper">
          <div className="container">
            <div className="column float-left">
              <h3 className="title">LaiHuanMin的Web前端之旅</h3>
            </div>
            <div className="column float-right" style={{ marginLeft: "10px" }}>
              <Link to="/projectDetail">开源项目</Link>
            </div>
            <div className="column float-right" style={{ marginLeft: "10px" }}>
              <Link to="/projectDetail">个人简历</Link>
            </div>
            <div className="column float-right">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/LaiHuanMin"
              >
                Github
              </a>
            </div>
          </div>
        </div>
        <div className="content-wrapper container">
          <div className="content-panel">hello</div>
          <div className="notice-text">建议在PC端下浏览，效果最佳！</div>
        </div>
      </div>
    );
  }
}
