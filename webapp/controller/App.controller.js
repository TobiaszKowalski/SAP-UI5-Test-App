sap.ui.define([
	"sap/ui/core/mvc/Controller", 
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.Controller.App", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		onOpenDialog: function () {
			this.getOwnerComponent().openHelloDialog();
		}
	});
});