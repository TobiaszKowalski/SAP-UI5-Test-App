sap.ui.define([
    "sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"./controller/HelloDialog"
], function (UIComponent, JSONModel, HelloDialog) {
    "use strict";
    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            UIComponent.prototype.init.apply(this, arguments)
			//Пример данных
			let oData = {
				recipient: {
					name: "UI5"
				}
			};
			//Оборачиваем данные в оболочку из специального объекта
			let oModel = new JSONModel(oData);
			//Подключаем модель к слою представления
			this.setModel(oModel);
			this._helloDialog = new HelloDialog(this.getRootControl())
        },
		exit: function () {
			this._helloDialog.destroy();
			delete this._helloDialog;
		},
		openHelloDialog: function () {
			this._helloDialog.open();
		}
    })
}) 