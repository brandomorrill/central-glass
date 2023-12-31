define(['localize', 'locale', 'jquery'], function (localize, getLocale, $) {
    'use strict';
    if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
        try {
            return window.parent.require('translate');
        } catch (e) {}
    }
    var loadedNamespaces = {},
        localeName = (typeof webs !== 'undefined' && webs.locale) || 'en-US',
        resourceUrl,
        locale = getLocale(localeName),
        NOOP_NAMESPACE = 'none';
    resourceUrl = '/s/resources/' + localeName + '/';
    if (typeof webs !== 'undefined' && webs.props && webs.props.dynamicAssetServer) {
        resourceUrl = webs.props.dynamicAssetServer + resourceUrl;
    }
    var namespaceLoading = function (toTest) {
        var parts = toTest.split('.');
        for (var i = 0; i < parts.length; i++) {
            var ns = loadedNamespaces[parts.slice(0, i + 1).join('.')];
            if (ns) {
                return ns;
            }
        }
        return false;
    };
    var loadNamespace = function (namespace) {
        var loading = namespaceLoading(namespace);
        if (loading) {
            return loading;
        } else {
            var url = resourceUrl + namespace + '/',
                deferred = $.Deferred(),
                promise = deferred.promise();
            require([url.replace(/\/$/, '') + '?callback=define'], function (resources) {
                add(resources);
                deferred.resolve(resources);
            });
            loadedNamespaces[namespace] = promise;
            return promise;
        }
    };
    var add = function (data) {
        for (var k in data) {
            if (data.hasOwnProperty(k)) {
                locale[k] = data[k];
            }
        }
    };
    function extend(o, extensions) {
        function F() {}
        F.prototype = o;
        var obj = new F();
        for (var k in extensions) {
            obj[k] = extensions[k];
        }
        return obj;
    }
    var translate = function (key, vals) {
        var resources = extend(locale, vals);
        return localize.localize(key, resources);
    };
    try {
        if (require.s.contexts._.specified.prefetchTranslationNamespaces) {
            require(['prefetchTranslationNamespaces'], function (namespaces) {
                $.each(namespaces, function (i, namespace) {
                    loadNamespace(namespace);
                });
            });
        }
    } catch (e) {}
    return {
        load: function (name, req, load, config) {
            name = String(name).toString();
            if (!config.isBuild) {
                if (name === NOOP_NAMESPACE) {
                    load(translate);
                } else {
                    loadNamespace(name).then(function () {
                        load(translate);
                    });
                }
            } else {
                load();
            }
        },
        translate: translate,
        add: add,
    };
});
