import mixpanel from "mixpanel-browser";

mixpanel.init("de2c52c12dccdc9bc73a5949b888672b");

export function MixPanelInterceptorFactory() {
    return {
        request: function (config) {
            mixpanel.track("Request started", {
                method: config.method,
                url: config.url
            });
            return config;
        },
        response: function (response) {
            mixpanel.track("Request finished", {
                method: response.config.method,
                url: response.config.url,
                status: response.status,
                statusText: response.statusText
            });
            return response;
        }
    }
}