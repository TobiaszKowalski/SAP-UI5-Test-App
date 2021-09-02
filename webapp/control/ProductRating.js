sap.ui.define([
	"sap/ui/core/Control",
    "sap/m/RatingIndicator",
	"sap/m/Label",
	"sap/m/Button"
], function(Control, RatingIndicator, Label, Button) {
	"use strict";

	return Control.extend("sap.ui.demo.walkthrough.control.ProductRating", {
        /*
        The metadata section defines the data structure and thus the API of the control. 
        With this meta information on the properties, events, and aggregations of the control SAPUI5
        automatically creates setter and getter methods and other convenience functions that can be 
        called within the app.
        */
        metadata: {
            properties: {
                value: {
                    type: "float", defaultValue: 0
                }
            },
            aggregations: {
                _rating : {type : "sap.m.RatingIndicator", multiple: false, visibility : "hidden"},
				_label : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				_button : {type : "sap.m.Button", multiple: false, visibility : "hidden"}
            },
            events: {
                change : {
					parameters : {
						value : {type : "int"}
					}
				}
            }
        },

        /*
        The init method is a special function that is called by the SAPUI5 core whenever the control is instantiated. 
        It can be used to set up the control and prepare its content for display.
        */
        init: function () {
            this.setAggregation("_rating", new RatingIndicator({
				value: this.getValue(),
				iconSize: "2rem",
				visualMode: "Half",
				liveChange: this._onRate.bind(this)
			}));
			this.setAggregation("_label", new Label({
				text: "{i18n>productRatingLabelInitial}"
			}).addStyleClass("sapUiSmallMargin"));
			this.setAggregation("_button", new Button({
				text: "{i18n>productRatingButton}",
				press: this._onSubmit.bind(this)
			}).addStyleClass("sapUiTinyMarginTopBottom"));
        },

        setValue: function (fValue) {
			this.setProperty("value", fValue, true);
			this.getAggregation("_rating").setValue(fValue);
		},

		reset: function () {
			let oResourceBundle = this.getModel("i18n").getResourceBundle();

			this.setValue(0);
			this.getAggregation("_label").setDesign("Standard");
			this.getAggregation("_rating").setEnabled(true);
			this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial"));
			this.getAggregation("_button").setEnabled(true);
		},

		_onRate : function (oEvent) {
			let oRessourceBundle = this.getModel("i18n").getResourceBundle();
			let fValue = oEvent.getParameter("value");

			this.setProperty("value", fValue, true);

			this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
			this.getAggregation("_label").setDesign("Bold");
		},

		_onSubmit : function (oEvent) {
			let oResourceBundle = this.getModel("i18n").getResourceBundle();

			this.getAggregation("_rating").setEnabled(false);
			this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal"));
			this.getAggregation("_button").setEnabled(false);
			this.fireEvent("change", {
				value: this.getValue()
			});
		},

        /*
        The renderer defines the HTML structure that will be added to the DOM tree of your app 
        whenever the control is instantiated in a view. It is usually called initially by the core of SAPUI5 and
        whenever a property of the control is changed. The parameter oRM of the render function is the
        SAPUI5 render manager that can be used to write strings and control properties to the HTML page.
        */
        renderer: function (oRm, oControl) {
            oRm.openStart("div", oControl);
			oRm.class("myAppDemoWTProductRating");
			oRm.openEnd();
			oRm.renderControl(oControl.getAggregation("_rating"));
			oRm.renderControl(oControl.getAggregation("_label"));
			oRm.renderControl(oControl.getAggregation("_button"));
			oRm.close("div");
        }
	});
});