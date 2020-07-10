exports.id = "server";
exports.modules = {

/***/ "./src/IssueDetail.jsx":
/*!*****************************!*\
  !*** ./src/IssueDetail.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IssueDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function IssueDetail({
  issue
}) {
  // constructor() {
  //   super();
  //   this.state = {
  //     issue: {},
  //     toastVisible: false,
  //     toastMessage: ' ',
  //     toastType: 'info',
  //   };
  //   this.showError = this.showError.bind(this);
  //   this.dismissToast = this.dismissToast.bind(this);
  // }
  //
  // componentDidMount() {
  //   this.loadData();
  // }
  //
  // componentDidUpdate(prevProps) {
  //   const { match: { params: { id: prevId } } } = prevProps;
  //   const { match: { params: { id } } } = this.props;
  //   if (prevId !== id) {
  //     this.loadData();
  //   }
  // }
  //
  // showError(message) {
  //   this.setState({
  //     toastVisible: true, toastMessage: message, toastType: 'danger',
  //   });
  // }
  //
  // dismissToast() {
  //   this.setState({ toastVisible: false });
  // }
  //
  // async loadData() {
  //   const { match: { params: { id } } } = this.props;
  //   const query = `query issue($id: Int!) {
  //     issue (id: $id) {
  //       id description
  //     }
  //   }`;
  //   const data = await graphQLFetch(query, { id: parseInt(id, 10) }, this.showError);
  //   if (data) {
  //     this.setState({ issue: data.issue });
  //   } else {
  //     this.setState({ issue: {} });
  //   }
  // }
  // render() {
  //   const { issue: { description } } = this.state;
  //   const { toastVisible, toastType, toastMessage } = this.state;
  if (issue) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, issue.description));
  }

  return null;
}

/***/ })

};
//# sourceMappingURL=server.45e62e66c0ad5ce22022.hot-update.js.map