var GitHubApp = angular.module('GitHubApp', ['ngRoute', 'ngResource']);

GitHubApp
  .config(function($routeProvider){

    $routeProvider

      .when('/', {
        templateUrl: 'pages/main.html',
        controller: "mainCtrl"
      })

      .when('/repo/:user/:repo', {
        templateUrl: 'pages/repo-details.html',
        controller: "issueCtrl"
      });

  })
  .run(function($rootScope){

    /**
     * Github provides a special Link header on paginated API responses
     * based on: https://gist.github.com/niallo/3109252#gistcomment-1474669 
     *
     * @param {String} header GitHub Link header
     */
    $rootScope._parseLinkHeader = function _parseLinkHeader(header) {
      if (header.length === 0) {
        throw new Error("input must not be of zero length");
      }
      var parts = header.split(',');
      var links = {};
      for(var i=0; i<parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
          throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
      }
      return links;
    }

    /**
     * @param {Object} links hash, as returned by `_parseLinkHeader`
     */
    $rootScope._getNrOfPages = function _getNrOfPages(links) {
      if(links.last) {
        var regex = /&page=(\d+)/;
        var match = links.last.match(regex);
        return match ? match[1] : 1;
      }
    }

    /**
     * Parses GitHub-specific `headers` and adds them to a `headerinfo` property
     * on the `dst` object
     *
     * @param {Object} dst destination object, which will be extended
     * @param {Object} headers as returned by `$resource`s `transformResponse`
     */
    $rootScope.extendWithHeaderInfo = function extendWithHeaderInfo(dst, headers) {

      dst.headerInfo = {};

      dst.headerInfo.pagination = {};
      if(headers['link']) {
        var links = $rootScope._parseLinkHeader(headers['link']);
        dst.headerInfo.pagination.nrOfPages = $rootScope._getNrOfPages(links);
        dst.headerInfo.pagination.nextPage = links.next || null;
      }

      dst.headerInfo.rateLimit = {};
      if(headers['x-ratelimit-limit']){
        dst.headerInfo.rateLimit.limit = parseInt(headers['x-ratelimit-limit']);
      }
      if(headers['x-ratelimit-remaining']){
        dst.headerInfo.rateLimit.remaining = parseInt(headers['x-ratelimit-remaining']);
      }
    }
  });
