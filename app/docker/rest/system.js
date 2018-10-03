angular.module('portainer.docker')
.factory('System', ['$resource', 'API_ENDPOINT_ENDPOINTS', 'EndpointProvider', 'InfoInterceptor', 'VersionInterceptor',
  function SystemFactory($resource, API_ENDPOINT_ENDPOINTS, EndpointProvider, InfoInterceptor, VersionInterceptor) {
  'use strict';
  return $resource(API_ENDPOINT_ENDPOINTS + '/:endpointId/docker/:action/:subAction', {
    name: '@name',
    endpointId: EndpointProvider.endpointID
  },
  {
    ping: {
      method: 'GET', params: { action: '_ping' }, ignoreLoadingBar: true
    },
    info: {
      method: 'GET', params: { action: 'info' },
      ignoreLoadingBar: true, interceptor: InfoInterceptor
    },
    version: { method: 'GET', params: { action: 'version' }, ignoreLoadingBar: true, timeout: 4500, interceptor: VersionInterceptor },
    events: {
      method: 'GET', params: { action: 'events', since: '@since', until: '@until' },
      isArray: true, transformResponse: jsonObjectsToArrayHandler
    },
    auth: { method: 'POST', params: { action: 'auth' } },
    dataUsage: { method: 'GET', params: { action: 'system', subAction: 'df' } }
  });
}]);
