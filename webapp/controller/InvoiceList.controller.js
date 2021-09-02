sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
        formatter: formatter,
        onInit: function() {
            let oViewModel = new JSONModel({
                currency: "EUR"
            });
            this.getView().setModel(oViewModel, "view")        
        },
        onFilterInvoices: function(event) {
            //build filter array
            let arrFilter = [];
            let searchQuery = event.getParameter("query");
            if (searchQuery) {
                arrFilter.push(new Filter("ProductName", FilterOperator.Contains, searchQuery))
            }
            //filter binding
            let oList = this.byId("invoiceList");
            let oBinding = oList.getBinding("items");
            oBinding.filter(arrFilter)
        },
        onPress: function(oEvent) {
            let oItem = oEvent.getSource();
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("detail", {
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
            });
        }
	});
});