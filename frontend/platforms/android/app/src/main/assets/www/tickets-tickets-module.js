(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tickets-tickets-module"],{

/***/ "./src/app/tickets/ticket-item/ticket-item.component.html":
/*!****************************************************************!*\
  !*** ./src/app/tickets/ticket-item/ticket-item.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-item [routerLink]=\"['./', ticketItem.id]\">\n  <ion-avatar slot = \"start\">\n    <ion-img [src]=\"ticketItem.imageUrl\"></ion-img>\n  </ion-avatar>\n  <ion-label> {{ ticketItem.title }}</ion-label>\n</ion-item>\n"

/***/ }),

/***/ "./src/app/tickets/ticket-item/ticket-item.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/tickets/ticket-item/ticket-item.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RpY2tldHMvdGlja2V0LWl0ZW0vdGlja2V0LWl0ZW0uY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/tickets/ticket-item/ticket-item.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/tickets/ticket-item/ticket-item.component.ts ***!
  \**************************************************************/
/*! exports provided: TicketItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicketItemComponent", function() { return TicketItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TicketItemComponent = /** @class */ (function () {
    function TicketItemComponent() {
    }
    TicketItemComponent.prototype.ngOnInit = function () { };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TicketItemComponent.prototype, "ticketItem", void 0);
    TicketItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-ticket-item',
            template: __webpack_require__(/*! ./ticket-item.component.html */ "./src/app/tickets/ticket-item/ticket-item.component.html"),
            styles: [__webpack_require__(/*! ./ticket-item.component.scss */ "./src/app/tickets/ticket-item/ticket-item.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TicketItemComponent);
    return TicketItemComponent;
}());



/***/ }),

/***/ "./src/app/tickets/tickets.module.ts":
/*!*******************************************!*\
  !*** ./src/app/tickets/tickets.module.ts ***!
  \*******************************************/
/*! exports provided: TicketsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicketsPageModule", function() { return TicketsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _tickets_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tickets.page */ "./src/app/tickets/tickets.page.ts");
/* harmony import */ var _ticket_item_ticket_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ticket-item/ticket-item.component */ "./src/app/tickets/ticket-item/ticket-item.component.ts");








var routes = [
    {
        path: '',
        component: _tickets_page__WEBPACK_IMPORTED_MODULE_6__["TicketsPage"]
    }
];
var TicketsPageModule = /** @class */ (function () {
    function TicketsPageModule() {
    }
    TicketsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_tickets_page__WEBPACK_IMPORTED_MODULE_6__["TicketsPage"], _ticket_item_ticket_item_component__WEBPACK_IMPORTED_MODULE_7__["TicketItemComponent"]]
        })
    ], TicketsPageModule);
    return TicketsPageModule;
}());



/***/ }),

/***/ "./src/app/tickets/tickets.page.html":
/*!*******************************************!*\
  !*** ./src/app/tickets/tickets.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color="primary">\n    <ion-title>Tickets</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <app-ticket-item \n      *ngFor=\"let ticket of tickets\"\n      [ticketItem] =\"ticket\"\n      ></app-ticket-item>\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/tickets/tickets.page.scss":
/*!*******************************************!*\
  !*** ./src/app/tickets/tickets.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RpY2tldHMvdGlja2V0cy5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/tickets/tickets.page.ts":
/*!*****************************************!*\
  !*** ./src/app/tickets/tickets.page.ts ***!
  \*****************************************/
/*! exports provided: TicketsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicketsPage", function() { return TicketsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tickets_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tickets.service */ "./src/app/tickets/tickets.service.ts");



var TicketsPage = /** @class */ (function () {
    function TicketsPage(ticketsService) {
        this.ticketsService = ticketsService;
    }
    TicketsPage.prototype.ngOnInit = function () {
        this.tickets = this.ticketsService.getAllTickets();
    };
    TicketsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tickets',
            template: __webpack_require__(/*! ./tickets.page.html */ "./src/app/tickets/tickets.page.html"),
            styles: [__webpack_require__(/*! ./tickets.page.scss */ "./src/app/tickets/tickets.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_tickets_service__WEBPACK_IMPORTED_MODULE_2__["TicketsService"]])
    ], TicketsPage);
    return TicketsPage;
}());



/***/ })

}]);
//# sourceMappingURL=tickets-tickets-module.js.map