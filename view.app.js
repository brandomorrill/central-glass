define('view.app', [
    'jquery',
    'internal/sitebuilder/common/base',
    'internal/sitebuilder/common/log',
    'internal/sitebuilder/common/webs.modules',
    'internal/sitebuilder/builder/sitebase',
    'internal/sitebuilder/common/css_browser_selector',
], function ($) {
    'use strict';
    if (window.webs && typeof webs.fixNavWrap === 'function' && webs.mode !== 'bldr') {
        $(document).ready(webs.fixNavWrap);
    }
});
