import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class AuthModal extends Component {
  render() {
    let title;
    let linkText;

    if (this.props.modal === 'login') {
      title = 'Log In';
      linkText = 'Don\'t have an account? Register.';
    } else if (this.props.modal === 'signUp') {
      title = 'Let\'s get started';
      linkText = 'Already have an account? Login.';
    }

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.children}
          <a onClick={this.props.handleModalChange}>{linkText}</a>
        </Modal.Body>
      </Modal>
    );
  }
}
