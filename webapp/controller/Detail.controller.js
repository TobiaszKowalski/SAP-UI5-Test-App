sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onObjectMatched, this)
		},
		_onObjectMatched: function(oEvent) {
			this.getView().bindElement({
				path: `/${window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath)}`,
				model: "invoice"
			});
		},
		onNavBack: function() {
			let oHistory = History.getInstance();
			let sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("overview", {}, true);
			};
		}
	});
});