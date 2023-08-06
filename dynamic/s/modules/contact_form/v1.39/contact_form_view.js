define(['jquery','internal/sitebuilder/common/ModuleClassLoader','translate!webs.module.contact_form'],function($,ModuleClassLoader,translate){var module={},extend={};extend.submodules={"button":{"moduleType":"button"}};extend.styles={"default":{"global":{"css":"view.less","js":"view.js"},"default":true,"slug":"default"}};extend.styles['default']['global']['js']=(function(module,extend){module.oneLoaded=function(){this.parent.parent.fn.oneLoaded.call(this);var self=this;var form=self.el.find("form"),submitButton=self.el.find(".w-button"),submitLabel=submitButton.parents("label"),resubmit_link=self.el.find(".resubmit_form_link"),contact_form_container=self.el.find(".w-contact_form-container"),prohibitedLabels=[],tokens=[];submitButton.click(function(){form.submit();return false;});submitLabel.click(function(){return false;});form.submit(function(){var missingFields=[];form.find(".required").each(function(index,label){label=$(label).attr("for");var formItem=form.find("[name='"+label+"']"),formItemContainer=formItem.closest('.w-contact_form-li');if(!formItem.length)
formItem=form.find("#"+label);if(!formItem.length){missingFields.push({"labelFor":label,"reason":"missing"});return;}
switch(formItem[0].nodeName.toLowerCase()){case "input":switch(formItem.attr("type")){case "text":if(formItem.val().match(/^\s*$/)||formItemContainer.hasClass("error-item"))
missingFields.push({"labelFor":label,"reason":"blank"});break;case "email":if(!formItem.val().match(/^\s*([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})\s*$/))
missingFields.push({"labelFor":label,"reason":"invalidEmail"});break;case "checkbox":case "radio":if(form.find("[name='"+label+"']:checked").length===0)
missingFields.push({"labelFor":label,"reason":"noCheck"});break;}
break;case "textarea":if(formItem.val().match(/^\s*$/)||formItemContainer.hasClass("error-item"))
missingFields.push({"labelFor":label,"reason":"blank"});break;case "select":break;}});if(missingFields.length===0){$.ajax({url:webs.props.membersServer+form.attr("action"),type:form.attr("method"),data:form.serialize(),dataType:"jsonp",contentType:'application/json;charset=UTF-8',success:function(data){var success,padding,newHeight,failure;if(data.success){success=self.el.find(".success-message");padding=(form.height()-success.height())/2;newHeight=form.height();if(newHeight<success.height())newHeight=success.height();if(padding<0)padding=0;success.css({"padding-top":padding+"px","padding-bottom":padding+"px"});self.el.find(".w-contact_form-container").height(form.height()).addClass("success");}else{failure=self.el.find(".error-message");string=failure.find(".error-string");if(data.reason==="label_error"){string.html(translate("webs.module.contact_form.invalidForm"));}else if(data.reason==="akismet_spam"){string.html(translate("webs.module.contact_form.akismetSpam"));}
padding=(form.height()-failure.height())/2;newHeight=form.height();if(newHeight<failure.height())newHeight=failure.height();if(padding<0)padding=0;failure.css({"padding-top":padding+"px","padding-bottom":padding+"px"});self.el.find(".w-contact_form-container").height(newHeight).addClass("failure");}}});}else{form.addClass("error");$.each(missingFields,function(i,missing){var label=self.el.find("label[for='"+missing.labelFor+"']"),labelContainer=label.closest('.w-contact_form-li'),input;labelContainer.addClass("error-item");switch(self.el.find("[name='"+missing.labelFor+"']").attr("type")){case "checkbox":case "radio":self.el.find("[name='"+missing.labelFor+"']").bind("focus click change",function(){labelContainer.removeClass("error-item");if(!form.find(".error-item").length)form.removeClass("error");});break;default:input=form.find("#"+missing.labelFor);var inputValue="",inputLabel=form.find("label[for='"+missing.labelFor+"']").text();if(missing.reason==="invalidEmail"){inputValue=translate('webs.module.contact_form.error.invalidEmail',{label:inputLabel});}else{inputValue=translate('webs.module.contact_form.error.blank',{label:inputLabel});}
input.val(inputValue);input.bind("focus click keydown cut paste change",function(){input.unbind("focus click keydown cut paste change");input.val("");labelContainer.removeClass("error-item");if(!form.find(".error-item").length)form.removeClass("error");});}});}
return false;});$(contact_form_container).on('click','.resubmit_form_link',function(e){e.preventDefault();contact_form_container.removeClass("success").removeClass("failure");});};return module;});extend.defaultStyle=extend.styles['default'];return ModuleClassLoader.register('contact_form',module,extend);});