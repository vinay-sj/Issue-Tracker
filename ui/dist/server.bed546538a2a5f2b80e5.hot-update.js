exports.id = "server";
exports.modules = {

/***/ "./src/SignInNavItem.jsx":
/*!*******************************!*\
  !*** ./src/SignInNavItem.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _withToast_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./withToast.jsx */ "./src/withToast.jsx");




class SignInNavItem extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      disabled: true,
      user: {
        signedIn: false,
        givenName: ''
      }
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    if (!clientId) return;
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({
          client_id: clientId
        }).then(() => {
          this.setState({
            disabled: false
          });
        });
      }
    });
  }

  async signIn() {
    this.hideModal();
    const {
      showError
    } = this.props;

    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      const givenName = googleUser.getBasicProfile().getGivenName();
      this.setState({
        user: {
          signedIn: true,
          givenName
        }
      });
    } catch (error) {
      showError(`Error authenticating with Google: ${error.error}`);
    }
  }

  signOut() {
    this.setState({
      user: {
        signedIn: false,
        givenName: ''
      }
    });
  }

  showModal() {
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    console.log(clientId);
    const {
      showError
    } = this.props;

    if (!clientId) {
      showError('Missing environment variable GOOGLE_CLIENT_ID');
      return;
    }

    this.setState({
      showing: true
    });
  }

  hideModal() {
    this.setState({
      showing: false
    });
  }

  render() {
    const {
      user
    } = this.state;

    if (user.signedIn) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavDropdown"], {
        title: user.givenName,
        id: "user"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["MenuItem"], {
        onClick: this.signOut
      }, "Sign out"));
    }

    const {
      showing,
      disabled
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavItem"], {
      onClick: this.showModal
    }, "Sign in"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
      keyboard: true,
      show: showing,
      onHide: this.hideModal,
      bsSize: "sm"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, null, "Sign in")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      block: true,
      disabled: disabled,
      bsStyle: "primary",
      onClick: this.signIn
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "https://goo.gl/4yjp6B",
      alt: "Sign In"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      bsStyle: "link",
      onClick: this.hideModal
    }, "Cancel"))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_withToast_jsx__WEBPACK_IMPORTED_MODULE_2__["default"])(SignInNavItem));

/***/ })

};
//# sourceMappingURL=server.bed546538a2a5f2b80e5.hot-update.js.map