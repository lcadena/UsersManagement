(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tickets-ticket-detail-ticket-detail-module"],{

/***/ "./src/app/tickets/ticket-detail/ticket-detail.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/tickets/ticket-detail/ticket-detail.module.ts ***!
  \***************************************************************/
/*! exports provided: TicketDetailPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicketDetailPageModule", function() { return TicketDetailPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ticket_detail_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ticket-detail.page */ "./src/app/tickets/ticket-detail/ticket-detail.page.ts");







var routes = [
    {
        path: '',
        component: _ticket_detail_page__WEBPACK_IMPORTED_MODULE_6__["TicketDetailPage"]
    }
];
var TicketDetailPageModule = /** @class */ (function () {
    function TicketDetailPageModule() {
    }
    TicketDetailPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_ticket_detail_page__WEBPACK_IMPORTED_MODULE_6__["TicketDetailPage"]]
        })
    ], TicketDetailPageModule);
    return TicketDetailPageModule;
}());



/***/ }),

/***/ "./src/app/tickets/ticket-detail/ticket-detail.page.html":
/*!***************************************************************!*\
  !*** ./src/app/tickets/ticket-detail/ticket-detail.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color = \"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref = \"/tickets\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{ loadedTicket.title }}</ion-title>\n    <ion-buttons slot=\"primary\">\n        <ion-button (click)=\"onDeleteTicket()\">\n          <ion-icon name=\"trash\" slot=\"icon-only\">\n              <!-- ionicons.com -->            \n          </ion-icon>\n        </ion-button>\n      </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid no-padding>\n    <ion-row>\n      <ion-col no-padding>\n         <ion-img [src] = \"loadedTicket.imageUrl\"></ion-img></ion-col>\n    </ion-row>\n    <ion-row>\n    <ion-col>\n      <h1 text-center>{{ loadedTicket.title }}</h1>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <ion-list>\n        <ion-item *ngFor = \"let product of loadedTicket.products\">\n          {{ product }}\n        </ion-item>\n      </ion-list>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/tickets/ticket-detail/ticket-detail.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/tickets/ticket-detail/ticket-detail.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RpY2tldHMvdGlja2V0LWRldGFpbC90aWNrZXQtZGV0YWlsLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/tickets/ticket-detail/ticket-detail.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/tickets/ticket-detail/ticket-detail.page.ts ***!
  \*************************************************************/
/*! exports provided: TicketDetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicketDetailPage", function() { return TicketDetailPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tickets_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tickets.service */ "./src/app/tickets/tickets.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");





var TicketDetailPage = /** @class */ (function () {
    function TicketDetailPage(activatedRoute, ticketsService, router, alertCrtl) {
        this.activatedRoute = activatedRoute;
        this.ticketsService = ticketsService;
        this.router = router;
        this.alertCrtl = alertCrtl;
    }
    TicketDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.paramMap.subscribe(function (paramMap) {
            if (!paramMap.has('ticketId')) {
                _this.router.navigate(['/tickets']);
                return;
            }
            var ticketId = paramMap.get('ticketId');
            _this.loadedTicket = _this.ticketsService.getTicket(ticketId);
        });
    };
    TicketDetailPage.prototype.onDeleteTicket = function () {
        var _this = this;
        this.alertCrtl.create({
            header: 'Are you sure?',
            message: 'Do you really want to delete the Ticket?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.ticketsService.deleteTicket(_this.loadedTicket.id);
                        _this.router.navigate(['/tickets']);
                    }
                }
            ]
        }).then(function (alertEl) {
            alertEl.present();
        });
    };
    TicketDetailPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-ticket-detail',
            template: __webpack_require__(/*! ./ticket-detail.page.html */ "./src/app/tickets/ticket-detail/ticket-detail.page.html"),
            styles: [__webpack_require__(/*! ./ticket-detail.page.scss */ "./src/app/tickets/ticket-detail/ticket-detail.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _tickets_service__WEBPACK_IMPORTED_MODULE_3__["TicketsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"]])
    ], TicketDetailPage);
    return TicketDetailPage;
}());



/***/ })

}]);
//# sourceMappingURL=tickets-ticket-detail-ticket-detail-module.js.map