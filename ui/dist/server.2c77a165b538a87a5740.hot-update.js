exports.id = "server";
exports.modules = {

/***/ "./src/IssueEdit.jsx":
/*!***************************!*\
  !*** ./src/IssueEdit.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IssueEdit; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-bootstrap */ "react-router-bootstrap");
/* harmony import */ var react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _NumInput_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NumInput.jsx */ "./src/NumInput.jsx");
/* harmony import */ var _DateInput_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DateInput.jsx */ "./src/DateInput.jsx");
/* harmony import */ var _TextInput_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TextInput.jsx */ "./src/TextInput.jsx");
/* harmony import */ var _Toast_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Toast.jsx */ "./src/Toast.jsx");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./store.js */ "./src/store.js");










class IssueEdit extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, showError) {
    const query = `query issue($id: Int!) {
      issue(id: $id) {
        id title status owner
        effort created due description
      }
    }`;
    const {
      params: {
        id
      }
    } = match;
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, {
      id: parseInt(id, 10)
    }, showError);
    return result;
  }

  constructor() {
    super();
    const issue = _store_js__WEBPACK_IMPORTED_MODULE_9__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_9__["default"].initialData.issue : null;
    delete _store_js__WEBPACK_IMPORTED_MODULE_9__["default"].initialData;
    this.state = {
      issue,
      invalidFields: {},
      showingValidation: false,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success'
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    const {
      issue
    } = this.state;
    if (issue == null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          id: prevId
        }
      }
    } = prevProps;
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;

    if (id !== prevId) {
      this.loadData();
    }
  }

  onValidityChange(event, valid) {
    const {
      name
    } = event.target;
    this.setState(prevState => {
      const invalidFields = { ...prevState.invalidFields,
        [name]: !valid
      };
      if (valid) delete invalidFields[name];
      return {
        invalidFields
      };
    });
  }

  onChange(event, naturalValue) {
    const {
      name,
      value: textValue
    } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      issue: { ...prevState.issue,
        [name]: value
      }
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.showValidation();
    const {
      issue,
      invalidFields
    } = this.state;
    if (Object.keys(invalidFields).length !== 0) return;
    const query = `mutation issueUpdate(
      $id: Int!
      $changes: IssueUpdateInputs!
      ) {
      issueUpdate(
      id: $id
      changes: $changes
      ) {
      id title status owner
      effort created due description
      }
      }`;
    const {
      id,
      created,
      ...changes
    } = issue;
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, {
      changes,
      id
    }, this.showError);

    if (data) {
      this.setState({
        issue: data.issueUpdate
      });
      this.showSuccess('Updated issue successfully');
    }
  }

  async loadData() {
    const {
      match
    } = this.props;
    const data = await IssueEdit.fetchData(match, this.showError);
    this.setState({
      issue: data ? data.issue : {},
      invalidFields: {}
    });
  }

  showValidation() {
    this.setState({
      showingValidation: true
    });
  }

  dismissValidation() {
    this.setState({
      showingValidation: false
    });
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: 'success'
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: 'danger'
    });
  }

  dismissToast() {
    this.setState({
      toastVisible: false
    });
  }

  render() {
    const {
      issue
    } = this.state;
    if (issue == null) return null;
    const {
      issue: {
        id
      }
    } = this.state;
    const {
      match: {
        params: {
          id: propsId
        }
      }
    } = this.props;
    const {
      toastVisible,
      toastMessage,
      toastType
    } = this.state;

    if (id == null) {
      if (propsId != null) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, `Issue with ID ${propsId} not found.`);
      }

      return null;
    }

    const {
      issue: {
        title,
        status
      }
    } = this.state;
    const {
      issue: {
        owner,
        effort,
        description
      }
    } = this.state;
    const {
      issue: {
        created,
        due
      }
    } = this.state;
    const {
      invalidFields,
      showingValidation
    } = this.state;
    let validationMessage;

    if (Object.keys(invalidFields).length !== 0 && showingValidation) {
      validationMessage = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Alert"], {
        bsStyle: "danger",
        onDismiss: this.dismissValidation
      }, "Please correct invalid fields before submitting.");
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Panel"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Panel"].Heading, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Panel"].Title, null, `Editing issue: ${id}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Panel"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      horizontal: true,
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      componentClass: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ControlLabel"],
      sm: 3
    }, "Created"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      sm: 9
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormControl"].Static, null, created.toDateString()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      componentClass: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ControlLabel"],
      sm: 3
    }, "Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      sm: 9
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormControl"], {
      componentClass: "select",
      name: "status",
      value: status,
      onChange: this.onChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "New"
    }, "New"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "Assigned"
    }, "Assigned"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "Fixed"
    }, "Fixed"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "Closed"
    }, "Closed")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      componentClass: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ControlLabel"],
      sm: 3
    }, "Owner"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      sm: 9
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormControl"], {
      componentClass: _TextInput_jsx__WEBPACK_IMPORTED_MODULE_7__["default"],
      name: "owner",
      value: owner,
      onChange: this.onChange,
      key: id
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      componentClass: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ControlLabel"],
      sm: 3
    }, "Effort"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      sm: 9
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormControl"], {
      componentClass: _NumInput_jsx__WEBPACK_IMPORTED_MODULE_5__["default"],
      name: "effort",
      value: effort,
      onChange: this.onChange,
      key: id
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormGroup"], {
      validationState: invalidFields.due ? 'error' : null
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      componentClass: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ControlLabel"],
      sm: 3
    }, "Due"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      sm: 9
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormControl"], {
      componentClass: _DateInput_jsx__WEBPACK_IMPORTED_MODULE_6__["default"],
      onValidityChange: this.onValidityChange,
      name: "due",
      value: due,
      onChange: this.onChange,
      key: id
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormControl"].Feedback, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      componentClass: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ControlLabel"],
      sm: 3
    }, "Title"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      sm: 9
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormControl"], {
      componentClass: _TextInput_jsx__WEBPACK_IMPORTED_MODULE_7__["default"],
      size: 50,
      name: "title",
      value: title,
      onChange: this.onChange,
      key: id
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      componentClass: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ControlLabel"],
      sm: 3
    }, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      sm: 9
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormControl"], {
      componentClass: _TextInput_jsx__WEBPACK_IMPORTED_MODULE_7__["default"],
      tag: "textarea",
      rows: 4,
      cols: 50,
      name: "description",
      value: description,
      onChange: this.onChange,
      key: id
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      smOffset: 3,
      sm: 6
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ButtonToolbar"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      bsStyle: "primary",
      type: "submit"
    }, "Submit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2__["LinkContainer"], {
      to: "/issues"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      bsStyle: "link"
    }, "Back"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      smOffset: 3,
      sm: 9
    }, validationMessage)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Panel"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      to: `/edit/${id - 1}`
    }, "Prev"), ' | ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      to: `/edit/${id + 1}`
    }, "Next")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Toast_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
      showing: toastVisible,
      onDismiss: this.dismissToast,
      bsStyle: toastType
    }, toastMessage));
  }

}

/***/ })

};
//# sourceMappingURL=server.2c77a165b538a87a5740.hot-update.js.map