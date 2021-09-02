sap.ui.define([
    "sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"./controller/HelloDialog",
	"sap/ui/Device"
], function (UIComponent, JSONModel, HelloDialog, Device) {
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

			let oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

			this._helloDialog = new HelloDialog(this.getRootControl());

			// создание views основанных на определенных в manifest.json url
			this.getRouter().initialize();
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