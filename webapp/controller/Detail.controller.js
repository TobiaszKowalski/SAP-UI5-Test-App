sap.ui.define([
	"sap/ui/core/mvc/Controller",
], function(Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onObjectMatched, this)
		},
		_onObjectMatched: function(oEvent) {
			this.getView().bindElement({
				path: `/${window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath)}`,
				model: "invoice"
			})
		}
	});
});