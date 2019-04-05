/**
 * Copyright © 2017 Mozg. All rights reserved.
 * See LICENSE.txt for license details.
 */

//

// 2019-04-05 01:37:18

//

/*
- object literals
*/

//

card_previousCardNumber = "";

var debugData = [];

var Mozg = Mozg || {};

Mozg.Payment = {

    _version: '1.0.0',

    construct: function(){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Payment.' + calleeName;
        console.log(methodName);
        debugData.push(methodName);

        //

    },

    variableObject: {},

    initialize: function(){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Payment.' + calleeName;
        console.log(methodName);
        debugData.push(methodName);

        //

        var variableObject = Mozg.Payment.variableObject;

        variableObject.config = arguments[0];

        //

        Mozg.Payment.construct(variableObject.config);

        //

        debugData.push(variableObject.config);

        //

    },

    fixPci: function(){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Payment.' + calleeName;
        console.log(methodName);
        debugData.push(methodName);

        //

        //

        /*
        console.log(checkout);
        console.log(typeof(checkout.gotoSection));
        console.log(checkout.gotoSection);
        */

        if(typeof(checkout) !== 'undefined'){
            if(typeof(checkout.gotoSection) !== 'undefined'){
                checkout.gotoSection('payment');
            }
        }

        //

        // http://www.w3schools.com/jsref/coll_form_elements.asp

        var myForm = document.getElementById("co-payment-form"); // Nativo e IWD_Opc
        //console.log(myForm);
        if(!myForm){ // Inovarti_Onestepcheckout 4
            var myForm = document.getElementById("onepagecheckout_orderform");
        }
        if(!myForm){ // Inovarti_Onestepcheckout 6
            var myForm = document.getElementById("onestepcheckout-general-form");
        }
        if(!myForm){ // Ideasa_IdeCheckoutvm
            var myForm = document.getElementById("ide-checkout-form");
        }

        //console.log(myForm);
        var i;
        for (i = 0; i < myForm.length; i++) {

            var elementIndex = myForm.elements[i];

            var elementType = elementIndex.type;
            var check = (elementType == 'text');

            //console.log(elementType);
            //console.log(check);

            if(check){

                var elementId = elementIndex.id;
                var contain = elementId.includes('mozg_');

                //console.log(elementId);
                //console.log(contain);

                if(contain){

                    console.log(elementIndex);

                    elementIndex.value = '';

                }
            }
        }

        //

    },

    fixDiscountInstallment: function(_this, paymentMethod){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Payment.' + calleeName;
        console.log(methodName);
        debugData.push(methodName);

        //

        // FIX: Discount Installment
        //var paymentMethod = arguments[0];
        console.log(paymentMethod);

        var contain_A = paymentMethod.includes('mozg_');
        var contain_B = paymentMethod.includes('_cc');

        console.log(contain_A);
        console.log(contain_B);

        if( (contain_A == true) && (contain_B == true) ){
            //

            function _triggerEvent(){

                console.log(arguments.callee.name);

                //

                var elementName = 'li_' + paymentMethod + '_installments';
                //var element = $(elementName);
                console.log(elementName);
                var element = document.getElementsByClassName(elementName);
                console.log(element);
                var element = element[0];
                console.log(element);
                element.removeClassName("no-display");

                //

                // /mozg_???/GetInstallments/

                var elementName = paymentMethod + '_cc_number';
                document.getElementById(elementName).focus();

                var elementName = paymentMethod + '_cc_number';
                document.getElementById(elementName).blur();

                //

                var contain = paymentMethod.includes('pagseguro');

                if(contain){
                    Mozg.Pagseguro.getAmount();
                }

                //

            }

            // /checkout/onepage/savePayment/

            var url = _this.saveUrl;

            console.log(url);

            var req = new Ajax.Request(url, {
                //evalScripts: true,
                method: 'post',
                //asynchronous: true,
                parameters:Form.serialize(_this.form),
                onCreate: function(response) {
                    console.log('onCreate ' + calleeName);
                },
                onLoading: function(response) {
                    console.log('onLoading ' + calleeName);
                },
                onComplete: function(response) {
                    console.log('onComplete ' + calleeName);
                    //console.log(response);
                },
                onSuccess: function(response) {
                    console.log('onSuccess ' + calleeName);
                    //console.log(response);

                    setTimeout(function() {
                        _triggerEvent();
                    }, 1000);

                },
                onFailure: function(response){
                    console.log('onFailure ' + calleeName);
                    console.log(response);
                    alert('Server Error. Please try again.');
                }
            });

            //
        }
        // FIX: Discount Installment

    },

    observerCheckout: function(type, message){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Payment.' + calleeName;
        console.log(methodName);
        debugData.push(methodName);

        //

        /*

        console.log(Object.getOwnPropertyNames(window).sort());
        console.log(IdeCheckoutvm);
        console.log(IdeLoader);

        */

        //

        // https://erfanimani.com/four-ways-to-edit-magentos-javascript

        //

        // /js/varien/accordion.js

        if(typeof(Accordion) !== 'undefined'){

            console.log(Accordion);

            // Add a "parent_METHOD" method to prototype which is then a clone of the super "METHOD"
            Accordion.prototype.parent_openSection = Accordion.prototype.openSection;

            // Using addMethods() to overload METHOD

            var objectMethods = {
                openSection: function(section) {

                    console.log('Accordion.prototype.openSection');
                    console.log(arguments);
                    console.log(this);

                    // As we "cloned" "METHOD" to "parent_METHOD", we still have access to the super method
                    // And, as in wrap(), we can avoid calling this.parent_METHOD() if we do not want to use the super method
                    this.parent_openSection(section);

                }
            };

            Accordion.addMethods(objectMethods);

        }

        //

        // /skin/frontend/base/default/js/opcheckout.js

        if(typeof(Checkout) !== 'undefined'){

            console.log(Checkout);

            // Add a "parent_METHOD" method to prototype which is then a clone of the super "METHOD"
            Checkout.prototype.parent_reloadReviewBlock = Checkout.prototype.reloadReviewBlock;

            // Using addMethods() to overload METHOD

            var objectMethods = {
                reloadReviewBlock: function() {

                    console.log('Checkout.prototype.reloadReviewBlock');
                    console.log(arguments);
                    console.log(this);

                    // As we "cloned" "METHOD" to "parent_METHOD", we still have access to the super method
                    // And, as in wrap(), we can avoid calling this.parent_METHOD() if we do not want to use the super method
                    this.parent_reloadReviewBlock();

                }
            };

            Checkout.addMethods(objectMethods);

        }

        //

        if(typeof(Payment) !== 'undefined'){

            console.log(Payment);

            // Add a "parent_METHOD" method to prototype which is then a clone of the super "METHOD"
            Payment.prototype.parent_switchMethod = Payment.prototype.switchMethod;
            Payment.prototype.parent_save = Payment.prototype.save;

            // Using addMethods() to overload METHOD

            var objectMethods = {
                switchMethod: function(method) {

                    console.log('Payment.prototype.switchMethod');
                    console.log(arguments);
                    console.log(this);


                    // As we "cloned" "METHOD" to "parent_METHOD", we still have access to the super method
                    // And, as in wrap(), we can avoid calling this.parent_METHOD() if we do not want to use the super method
                    this.parent_switchMethod(method);


                    if(typeof(Accordion) !== 'undefined'){ // FIX: Checkout Nativo
                        var paymentMethod = arguments[0];
                        console.log(paymentMethod);
                        Mozg.Payment.fixDiscountInstallment(this, paymentMethod);
                    }

                },
                save: function() {

                    console.log('Payment.prototype.save');
                    console.log(arguments);
                    console.log(this);

                    // As we "cloned" "METHOD" to "parent_METHOD", we still have access to the super method
                    // And, as in wrap(), we can avoid calling this.parent_METHOD() if we do not want to use the super method
                    this.parent_save();

                }
            };

            Payment.addMethods(objectMethods);


        }

        //

        if(typeof(Review) !== 'undefined'){

            console.log(Review);

            // Add a "parent_METHOD" method to prototype which is then a clone of the super "METHOD"
            Review.prototype.parent_save = Review.prototype.save;

            // Using addMethods() to overload METHOD

            var objectMethods = {
                save: function() {

                    console.log('Review.prototype.save');
                    console.log(arguments);
                    console.log(this);

                    // As we "cloned" "METHOD" to "parent_METHOD", we still have access to the super method
                    // And, as in wrap(), we can avoid calling this.parent_METHOD() if we do not want to use the super method
                    this.parent_save();

                }
            };

            Review.addMethods(objectMethods);

            //

            // #######
            // #######
            //  No checkout Nativo, caso retorne erro de transação limpa os formularios de pagamento

            // Add a "parent_METHOD" method to prototype which is then a clone of the super "METHOD"
            Review.prototype.parent_nextStep = Review.prototype.nextStep;

            // Using addMethods() to overload METHOD

            var objectMethods = {
                nextStep: function(transport) {

                    console.log('Review.prototype.nextStep');
                    console.log(arguments);
                    console.log(this);

                    var name = 'Review:nextStep';

                    var event_name = name + '_before';
                    var options = {
                        _this: this,
                        transport: transport
                    };
                    $(document).fire(event_name, options);
                    console.log(event_name);
                    console.log('---');

                    // As we "cloned" "METHOD" to "parent_METHOD", we still have access to the super method
                    // And, as in wrap(), we can avoid calling this.parent_METHOD() if we do not want to use the super method
                    this.parent_nextStep(transport);

                    var event_name = name + '_after';
                    var options = {
                        _this: this,
                        transport: transport
                    };
                    $(document).fire(event_name, options);
                    console.log(event_name);
                }
            };

            Review.addMethods(objectMethods);

            //

            document.observe("Review:nextStep_before", function() {
                console.log('observe("Review:nextStep_before"');
                console.log(arguments);

            });

            document.observe("Review:nextStep_after", function() {
                console.log('observe("Review:nextStep_after"');
                console.log(arguments);
                //console.log(e);

                var dataAvailable = arguments[0];
                console.log(dataAvailable);

                var json = dataAvailable.memo.transport.responseJSON;
                console.log(json);

                if(json.error){
                    // Checkout_Nativo - {"success":false,"error":true,"error_messages":"message"}
                    // IWD_Opc - {"error":"message","redirect":"http:"}
                    var error_return = (json.error != "undefined");
                    console.log('json.error: ' + error_return);
                }

                if (error_return){
                    Mozg.Payment.fixPci();
                }

            });

            //

        }

        //

        // #######
        // #######
        //  No checkout IWD_Opc, caso retorne erro de transação limpa os formularios de pagamento

        //console.log(IWD);
        //console.log(IWD.OPC);

        if (typeof(IWD) !== 'undefined') {

            console.log(IWD);

            var IWD_error = function(){
                console.log('#### IWD.OPC.Plugin.event(error ');
                console.log(arguments);

                Mozg.Payment.fixPci();
            };

            IWD.OPC.Plugin.event('error', IWD_error);

        }

        //

        // #######
        // #######
        //  No checkout Ideasa_IdeCheckoutvm, caso retorne erro de transação limpa os formularios de pagamento

        if(typeof(IdeCheckoutvm) !== 'undefined'){

            console.log(IdeCheckoutvm);

            //

            // Add a "parent_METHOD" method to prototype which is then a clone of the super "METHOD"
            IdeCheckoutvm.prototype.parent__showErrorMessage = IdeCheckoutvm.prototype._showErrorMessage;

            // Using addMethods() to overload METHOD

            var objectMethods = {
                _showErrorMessage: function(transport) {

                    console.log('IdeCheckoutvm.prototype._showErrorMessage');
                    console.log(arguments);
                    console.log(this);

                    var name = 'IdeCheckoutvm:_showErrorMessage';

                    var event_name = name + '_before';
                    var options = {
                        _this: this,
                        transport: transport
                    };
                    $(document).fire(event_name, options);
                    console.log(event_name);
                    console.log('---');

                    // As we "cloned" "METHOD" to "parent_METHOD", we still have access to the super method
                    // And, as in wrap(), we can avoid calling this.parent_METHOD() if we do not want to use the super method
                    this.parent__showErrorMessage(transport);

                    var event_name = name + '_after';
                    var options = {
                        _this: this,
                        transport: transport
                    };
                    $(document).fire(event_name, options);
                    console.log(event_name);
                }
            };

            IdeCheckoutvm.addMethods(objectMethods);

            //

            document.observe("IdeCheckoutvm:_showErrorMessage_before", function() {
                console.log('observe("IdeCheckoutvm:_showErrorMessage_before"');
                console.log(arguments);

            });

            document.observe("IdeCheckoutvm:_showErrorMessage_after", function() {
                console.log('observe("IdeCheckoutvm:_showErrorMessage_after"');
                console.log(arguments);

                Mozg.Payment.fixPci();

            });

            //

        }

        //

        // #######
        // #######
        //  No checkout Inovarti_Onestepcheckout 4, caso retorne erro de transação limpa os formularios de pagamento

        if(typeof(OPC) !== 'undefined'){

            console.log(OPC);

            //

            // Add a "parent_METHOD" method to prototype which is then a clone of the super "METHOD"
            OPC.prototype.parent_setResponse = OPC.prototype.setResponse;

            // Using addMethods() to overload METHOD

            var objectMethods = {
                setResponse: function(transport) {

                    console.log('OPC.prototype.setResponse');
                    console.log(arguments);
                    console.log(this);

                    var name = 'OPC:setResponse';

                    var event_name = name + '_before';
                    var options = {
                        _this: this,
                        transport: transport
                    };
                    $(document).fire(event_name, options);
                    console.log(event_name);
                    console.log('---');

                    // As we "cloned" "METHOD" to "parent_METHOD", we still have access to the super method
                    // And, as in wrap(), we can avoid calling this.parent_METHOD() if we do not want to use the super method
                    this.parent_setResponse(transport);

                    var event_name = name + '_after';
                    var options = {
                        _this: this,
                        transport: transport
                    };
                    $(document).fire(event_name, options);
                    console.log(event_name);

                },
            };

            //console.log(objectMethods);

            OPC.addMethods(objectMethods);

            //

            document.observe("OPC:setResponse_before", function() {
                console.log('observe("OPC:setResponse_before"');
                console.log(arguments);

            });

            document.observe("OPC:setResponse_after", function() {
                console.log('observe("OPC:setResponse_after"');
                console.log(arguments);
                //console.log(e);

                var dataAvailable = arguments[0];
                //console.log(dataAvailable);

                var json = dataAvailable.memo.transport.responseText;
                //console.log(typeof(json));
                //console.log(json);
                json = JSON.parse(json);
                //console.log(typeof(json));
                //console.log(json);

                var error_messages = json.error_messages;
                //console.log(success);

                if(error_messages){
                    Mozg.Payment.fixPci();
                }

            });

            //

        }

        //

        // #######
        // #######
        //  No checkout Inovarti_Onestepcheckout 6, caso retorne erro de transação limpa os formularios de pagamento

        if(typeof(OnestepcheckoutForm) !== 'undefined'){

            console.log(OnestepcheckoutForm);

            //

            /*var proto = OnestepcheckoutForm.prototype;
            //console.log(proto);
            var protoNames = Object.getOwnPropertyNames(OnestepcheckoutForm.prototype);
            //console.log(protoNames);

            var objectMethods = {}; // Creates a new object

            for (var key in protoNames) {
                if (protoNames.hasOwnProperty(key)) {

                    var method = protoNames[key];

                    //console.log(key + ' : ' + method);
                    objectMethods[method] = function(){

                        console.log('OnestepcheckoutForm.prototype.' + method);

                    };
                }
            }

            console.log(objectMethods);*/

            //

            // Add a "parent_METHOD" method to prototype which is then a clone of the super "METHOD"
            OnestepcheckoutForm.prototype.parent_onComplete = OnestepcheckoutForm.prototype.onComplete;

            // Using addMethods() to overload METHOD

            var objectMethods = {
                onComplete: function(transport) {

                    console.log('OnestepcheckoutForm.prototype.setResponse');
                    console.log(arguments);
                    console.log(this);

                    var name = 'OnestepcheckoutForm:onComplete';

                    var event_name = name + '_before';
                    var options = {
                        _this: this,
                        transport: transport
                    };
                    $(document).fire(event_name, options);
                    console.log(event_name);
                    console.log('---');

                    // As we "cloned" "METHOD" to "parent_METHOD", we still have access to the super method
                    // And, as in wrap(), we can avoid calling this.parent_METHOD() if we do not want to use the super method
                    this.parent_onComplete(transport);

                    var event_name = name + '_after';
                    var options = {
                        _this: this,
                        transport: transport
                    };
                    $(document).fire(event_name, options);
                    console.log(event_name);

                },
            };

            //console.log(objectMethods);

            OnestepcheckoutForm.addMethods(objectMethods);

            //

            document.observe("OnestepcheckoutForm:onComplete_before", function() {
                console.log('observe("OnestepcheckoutForm:onComplete_before"');
                console.log(arguments);

            });

            document.observe("OnestepcheckoutForm:onComplete_after", function() {
                console.log('observe("OnestepcheckoutForm:onComplete_after"');
                console.log(arguments);
                //console.log(e);

                var dataAvailable = arguments[0];
                //console.log(dataAvailable);

                var json = dataAvailable.memo.transport.responseText;
                //console.log(typeof(json));
                //console.log(json);
                json = JSON.parse(json);
                //console.log(typeof(json));
                //console.log(json);

                var success = json.success;
                //console.log(success);

                if(!success){
                    Mozg.Payment.fixPci();
                }

            });

            //

        }

        //

    },

    boletoTefEasterEgg: function(event, method_code){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Payment.' + calleeName;
        console.log(methodName);
        debugData.push(methodName);

        //

        var element = event.element();

        //console.log(event.shiftKey);

        if(!event.shiftKey){
            return false;
        }

        //

        var elementId_boleto_type = method_code + '_boleto_type';
        var elementId_eletronictransfer_type = method_code + '_eletronictransfer_type';

        console.log(elementId_boleto_type);
        console.log(elementId_eletronictransfer_type);

        var element_boleto = document.getElementById(elementId_boleto_type);
        var element_eletronictransfer = document.getElementById(elementId_eletronictransfer_type);

        if (typeof(element_boleto) != 'undefined' && element_boleto != null){
            var elementId_Object = element_boleto;
            console.log(element_boleto);
        }

        if (typeof(element_eletronictransfer) != 'undefined' && element_eletronictransfer != null){
            var elementId_Object = element_eletronictransfer;
            console.log(element_eletronictransfer);
        }

        //console.log(elementId_Object);

        if (typeof(elementId_Object) != 'undefined' && elementId_Object != null){
            if (typeof(elementId_Object.options) !== 'undefined') {

                var selectObjectLength = elementId_Object.options.length;

                var selectObjectLength = selectObjectLength - 1;

                console.log(selectObjectLength);

                // https://www.npmjs.com/package/random-integral
                var randomInt = require('random-integral');
                var _randomInt = randomInt({ min: 1, max: selectObjectLength });
                console.log(_randomInt);

                elementId_Object.selectedIndex = _randomInt;

            }

        }

        //

        // https://www.npmjs.com/package/cpf_cnpj
        var libCpfCnpj = require("cpf_cnpj");
        var CPF = libCpfCnpj.CPF;
        var CNPJ = libCpfCnpj.CNPJ;
        var generate_cpf = CPF.generate(true);
        var generate_cnpj = CNPJ.generate(true);

        // https://www.npmjs.com/package/random-item
        var randomItem = require('random-item');
        var random_documento = randomItem([generate_cpf, generate_cnpj]);
        console.log(random_documento);

        // https://www.npmjs.com/package/random-firstname
        var randomFirstName = require('random-firstname');
        var random_firstname = randomFirstName();
        console.log(random_firstname);

        // https://www.npmjs.com/package/random-lastname
        var randomLastName = require('random-lastname');
        var random_lastname = randomFirstName();
        console.log(random_lastname);

        var elementId_social_security_number = method_code + '_social_security_number';
        var elementId_firstname = method_code + '_firstname';
        var elementId_lastname = method_code + '_lastname';

        console.log(elementId_firstname);

        $(elementId_social_security_number).value = random_documento;
        $(elementId_firstname).value = random_firstname;
        $(elementId_lastname).value = random_lastname;

        //

        //

    },

    ccEasterEgg: function(event, method_code){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Payment.' + calleeName;
        console.log(methodName);
        debugData.push(methodName);

        //

        var element = event.element();

        //console.log(event.shiftKey);

        if(!event.shiftKey){
            return false;
        }

        // NPM

        // https://www.npmjs.com/package/random-item

        var randomItem = require('random-item');

        //var random_cc = randomItem(['Visa', 'MasterCard', 'Amex', 'Diners', 'Discover', 'JCB']);
        var random_cc = randomItem(['Visa', 'MasterCard']);

        //console.log(random_cc);

        // https://www.npmjs.com/package/creditcardgenerator

        var MozgNodeFramework = require("@mozg/node-framework");
        var creditcardgenerator = MozgNodeFramework.creditcardgenerator;

        var creditcard_json = creditcardgenerator.create(random_cc);

        var random_creditcard = creditcard_json.number;

        //console.log(random_creditcard);

        // https://www.npmjs.com/package/random-month

        var randomMonth = require('random-month');

        var random_month = randomMonth();

        //console.log(random_month);

        // https://www.npmjs.com/package/random-year

        var randomYear = require('random-year');

        var random_year = randomYear({ min: 2017, max: 2026 });

        //console.log(random_year);

        // https://github.com/mock-end/random-natural

        var randomNatural = require('random-natural');

        var random_number = randomNatural({ min: 100, max: 999 });

        //console.log(random_number);

        // https://www.npmjs.com/package/random-fullname

        var randomFullName = require('random-fullname');

        var random_fullname = randomFullName();

        //console.log(random_fullname);

        // https://www.npmjs.com/package/cpf_cnpj

        var libCpfCnpj = require("cpf_cnpj");
        var CPF = libCpfCnpj.CPF;
        var CNPJ = libCpfCnpj.CNPJ;

        var generate_cpf = CPF.generate(true);

        var generate_cnpj = CNPJ.generate(true);

        // https://www.npmjs.com/package/random-item

        var random_documento = randomItem([generate_cpf, generate_cnpj]);

        console.log(random_documento);

        //

        var elementId_cc_number = method_code + '_cc_number';
        var elementId_cc_owner = method_code + '_cc_owner';
        var elementId_cc_cid = method_code + '_cc_cid';
        var elementId_expiration = method_code + '_expiration';
        var elementId_expiration_yr = method_code + '_expiration_yr';

        var elementId_social_security_number = method_code + '_social_security_number';

        //

        $(elementId_cc_number).value = random_creditcard;
        $(elementId_cc_owner).value = random_fullname;
        $(elementId_cc_cid).value = random_number;
        $(elementId_expiration).value = random_month;
        $(elementId_expiration_yr).value = random_year;

        if( $(elementId_social_security_number) ){
            $(elementId_social_security_number).value = random_documento;
        }

        var cardType = {};
        cardType['Amex'] = "AE";
        cardType['Visa'] = "VI";
        cardType['MasterCard'] = "MC";
        cardType['Discover'] = "DI";
        cardType['Dinners'] = "OT";
        cardType['JCB'] = "JCB";
        cardType['ELO'] = "OT";
        cardType['Aura'] = "OT";

        console.log(cardType);

        if (typeof(AdminOrder) !== 'undefined') {
            console.log(AdminOrder);

            var elementId_cc_type = method_code + '_cc_type';

            var value = cardType[random_cc];

            console.log(value);

            $(elementId_cc_type).value = value;
        }

        $(elementId_cc_number).triggerEvent('change');
        $(elementId_cc_number).triggerEvent('keyup');

        //

        //

    },

    selectBrand: function(method_code, elementId_cc_number, hasInstallments, url_installments){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Payment.' + calleeName;
        console.log(methodName);
        debugData.push(methodName);

        //

        console.log(arguments);
        //console.dir(this);

        //

        cardNumber = document.getElementById(elementId_cc_number).value;
        dontHideErrorFrame = null;

        //

        var method_code = method_code;
        var cardType = null;
        var greyInactive = false;
        var hasInstallments = hasInstallments;
        var url_installments = url_installments;

        //

        // empty card field - reset all
        if (cardNumber.length == 0) {
            card_previousCardNumber = cardNumber;

            //

            Mozg.Payment.cardSetCardBrand(method_code, cardType, greyInactive, hasInstallments, url_installments);

            //

            return;
        }

        // When editing the card (but not adding digits at the end), don't reformat the number
        var l=0;
        while(l < card_previousCardNumber.length && l < cardNumber.length) {
            if(cardNumber[l] != card_previousCardNumber[l]) {
                card_previousCardNumber = cardNumber;
                return;
            }
            l++;
        }

        // remove all whitespace
        reg = /\s+/g;
        cardNumber = cardNumber.replace(reg,'');

        //console.log(cardNumber);

        nrOfDigits = cardNumber.length;
        if(nrOfDigits > 19){
            return;
        }

        //

        // https://www.npmjs.com/package/creditcard-info

        var creditcardInfo = require('creditcard-warder');

        var brand = creditcardInfo(cardNumber).getBrand();

        var cardType = {};
        cardType['visa'] = "VI";
        cardType['mastercard'] = "MC";
        cardType['amex'] = "AE";
        cardType['dinersclub'] = "DC";
        cardType['discover'] = "DI";
        cardType['jcb'] = "JCB";
        cardType['elo'] = "ELO";
        cardType['hipercard'] = "hipercard";
        cardType['aura'] = "AU";
        cardType['visaelectron'] = "VI";
        cardType['maestro'] = "SM";

        //console.log(cardType);

        var cardType = cardType[brand];

        console.log('cardType: ' + cardType);

        //

        if(cardType != null) {
            var greyInactive = true;
            Mozg.Payment.cardSetCardBrand(method_code, cardType, greyInactive, hasInstallments, url_installments);
        } else if(nrOfDigits > 4) {
            var cardType = null;
            var greyInactive = true;
            Mozg.Payment.cardSetCardBrand(method_code, cardType, greyInactive, hasInstallments, url_installments);
        } else {
            var cardType = null;
            var greyInactive = false;
            Mozg.Payment.cardSetCardBrand(method_code, cardType, greyInactive, hasInstallments, url_installments);
        }

        //show value with white space after four numbers
        result = cardNumber.replace(/(\d{4})/g, '$1 ');
        result = result.replace(/\s+$/, ''); //remove trailing spaces
        card_previousCardNumber = result;
        document.getElementById(elementId_cc_number).value = result;

        //console.log(result);

        //

    },

    cardSetCardBrand: function(method_code, cardType, greyInactive, hasInstallments, url_installments){

        debugData.push(arguments.callee.name);

        console.log('Mozg.Payment.cardSetCardBrand');

        //

        console.log(arguments);

        //

        var elementId_group_types = method_code + '_group_types';
        var group_types = eval(elementId_group_types);

        var elementId_cc_type = method_code + '_cc_type';

        var elementId_installments = method_code + '_installments';

        var elementId_cc_cid = method_code + '_cc_cid';

        //

        for(var i = 0; i < group_types.length; ++i) {
            var imageId =  elementId_cc_type + '_'  + i;
            //console.log('imageId: ' + imageId);
            //console.log('cardType: ' + cardType + ' / group_types[i]: ' + group_types[i]);
            if(cardType != null && group_types[i] == cardType) {
                //console.log('# remove class imageId: ' + imageId);
                // remove class
                $(imageId).removeClassName('grey');
                // set hidden field cc type for installments
                $(elementId_cc_type).setValue(cardType);
            } else {
                //console.log(greyInactive);
                if(greyInactive) {
                    //console.log('add class imageId: ' + imageId);
                    // add class
                    $(imageId).addClassName('grey');
                    //console.info($(imageId));
                } else {
                    //console.log('remove class imageId: ' + imageId);
                    // remove class
                    $(imageId).removeClassName('grey');
                }
            }
            document.getElementById(imageId).style.display="inline";
        }

        //

        if(hasInstallments && cardType != null ) {
            var url = url_installments;
            var elementId = elementId_installments;

            /*console.log(url);
            console.log(cardType);
            console.log(elementId);*/

            //var interval = setInterval(function() {
                //#####Mozg.Payment.getInstallments(url, cardType, elementId);
            //}, 500);
        }

        //

        var elementId = elementId_cc_cid;
        var selectedCardType = cardType != null ? cardType : null;

        Mozg.Payment.cardSetCvcElementselectedCardType(elementId, selectedCardType);

        Mozg.Payment.cardSetCVCRequired(elementId, selectedCardType);

        //

        //

    },

    getInstallments: function(url, ccType, elementName){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Payment.' + calleeName;
        console.log(methodName);
        debugData.push(methodName);

        console.log(arguments);
        console.log(url);

        //

        var req = new Ajax.Request( url, {
            //evalScripts: true,
            //method: 'get',
            //asynchronous: true,
            parameters:{ccType: ccType, isAjax: 1, method: 'POST'},
            onLoading: function(response) {
                console.log('onLoading ' + calleeName);
            },
            onCreate: function(response) {
                console.log('onCreate ' + calleeName);
            },
            onComplete: function(response) {
                console.log('onComplete ' + calleeName);
                console.log(response);
            },
            onSuccess: function(response) {
                console.log('onSuccess ' + calleeName);
                console.log(response);

                if(response.status == 200) {

                    console.log(arguments);

                    console.log(elementName);

                    //

                    /*var element = document.getElementsByClassName('li_' + elementName);
                    console.log(elementName);
                    console.log(element);
                    var element = element[0];
                    console.log(element);
                    element.removeClassName("no-display");*/

                    //

                    var elementId = document.getElementById(elementName);

                    // get current selected installment
                    var currentSelectedInstallment = elementId.getValue();

                    // clear the select box
                    elementId.options.length = 0;

                    var response = response.responseText.evalJSON();

                    var sel = false;
                    for (var key in response) {

                        // change the installments
                        var opt = document.createElement('option');
                        opt.text = response[key]
                        opt.value = key;
                        // check if selected installment is still available
                        if(currentSelectedInstallment == key) {
                            sel = true;
                        }
                        elementId.options.add(opt);
                    }

                    if(sel == true && currentSelectedInstallment) {
                        elementId.value=currentSelectedInstallment;
                    }
                }
            },
            onFailure: function(response){
                console.log('onFailure ' + calleeName);
                console.log(response);
                alert('Server Error. Please try again.');
            }
        });

        //

    },

    cardSetCvcElementselectedCardType: function(elementId, selectedCardType){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Payment.' + calleeName;
        console.log(methodName);
        debugData.push(methodName);

        //

        console.log(arguments);

        var cvcCodeElem = document.getElementById(elementId);

        // first remove classnames
        if(cvcCodeElem != null) {
            cvcCodeElem.removeClassName('maximum-length-3');
            cvcCodeElem.removeClassName('minimum-length-3');
            cvcCodeElem.removeClassName('maximum-length-4');
            cvcCodeElem.removeClassName('minimum-length-4');
        }

        if(selectedCardType == null) {
            // error do nothing
        } else if(selectedCardType == "AE") {
            cvcCodeElem.maxLength = 4;
            cvcCodeElem.addClassName('maximum-length-4');
            cvcCodeElem.addClassName('minimum-length-4');
        } else {
            cvcCodeElem.maxLength = 3;
            cvcCodeElem.addClassName('maximum-length-3');
            cvcCodeElem.addClassName('minimum-length-3');
        }

        //

    },

    cardSetCVCRequired: function(elementId, selectedCardType){

        var calleeName = arguments.callee.name;
        var methodName = 'Mozg.Payment.' + calleeName;
        console.log(methodName);
        debugData.push(methodName);

        //

        console.log(arguments);

        var cvcCodeElem = document.getElementById(elementId);
        var cvcCodeElemLabel = document.getElementById(elementId + '_label');
        var cvcCodeElemLabelEm = document.getElementById(elementId + '_label_em');

        if(selectedCardType != null && selectedCardType == "SM") {
            // cvc not required
            cvcCodeElem.removeClassName('required-entry');
            cvcCodeElemLabel.removeClassName('required');
            cvcCodeElemLabelEm.hide();
        } else {
            // cvc required
            cvcCodeElem.addClassName('required-entry');
            cvcCodeElemLabel.addClassName('required');
            cvcCodeElemLabelEm.show();
        }

        //

    },

};

//

Event.observe(window, 'load', function() {
    console.log('EventLoad');
    Mozg.Payment.observerCheckout();
});

//
