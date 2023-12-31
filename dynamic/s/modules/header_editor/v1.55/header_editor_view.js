define([
    'jquery',
    'internal/sitebuilder/common/ModuleClassLoader',
    'translate!webs.module.header_editor.js',
], function ($, ModuleClassLoader, translate) {
    var module = {},
        extend = {};
    extend.styles = {
        default: {
            global: { css: 'view.less' },
            instance: { css: 'view.each.less' },
            slug: 'default',
        },
    };
    if (!extend.styles['default']['global']) {
        extend.styles['default']['global'] = {};
    }
    extend.styles['default']['global']['js'] = null;
    extend.defaultStyle = extend.styles['default'];
    var headerEditor = { oneLoaded: function () {} };
    var mobileHeaderEditor = {
        oneLoaded: function () {
            var textLayers = $('.w-header-layer-text'),
                anchors = textLayers.find('a[href]');
            anchors.each(function () {
                $(this).replaceWith('<span>' + this.innerHTML + '</span>');
            });
        },
    };
    $.extend(module, headerEditor);
    if (webs && webs.theme && webs.theme.mobile) {
        $.extend(module, mobileHeaderEditor);
    }
    return ModuleClassLoader.register('header_editor', module, extend);
});
