import React, { Component } from "react";
import Modal from "react-awesome-modal";
export class SuccessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }
  render() {
    return (
      <div>
        <Modal
          visible={this.props.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={this.props.onClickAway}
        >
          <div>
            <h4 style={{ textAlign: "center", paddingTop: "30%" }}>
              Form Has Been Submitted Successfully.
            </h4>
          </div>
        </Modal>
        {/* <h1>Success</h1> */}
      </div>
    );
  }
}

export default SuccessModal;
