sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
        //Ф-ция, которая вызывается при срабатывании слушателя кнопки
        onShowHello: function () {
            //Чтение сообщения из модуля i18n
            let oBundle = this.getView().getModel("i18n").getResourceBundle(); //Получаем модуль i18n
            let sRecipient = this.getView().getModel().getProperty("/recipient/name"); //Получаем необходимый ключ/значение
            let sMessage = oBundle.getText("helloMsg", [sRecipient]); //Заменяем в i18n helloMsg на данные по ключу/значению
            //Рендер сообщения в стилизованном окне(компоненте)
            MessageToast.show(sMessage);
        },
        //Ф-ция, которая вызывается при срабатывании слушателя другой кнопки
        onOpenDialog: function () {
            this.getOwnerComponent().openHelloDialog();
        }
    });
});