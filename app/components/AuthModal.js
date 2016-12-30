import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class AuthModal extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          TEST
          <a onClick={this.props.handleModalChange}>Change Modal</a>
        </Modal.Body>
      </Modal>
    );
  }
}
