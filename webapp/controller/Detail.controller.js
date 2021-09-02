sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(Controller, History, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
		onInit: function() {
			let oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
			this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onObjectMatched, this)
		},
		_onObjectMatched: function(oEvent) {
			this.byId("rating").reset();
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
		},
		onRatingChange: function (oEvent) {
			let fValue = oEvent.getParameter("value");
			let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}
	});
});