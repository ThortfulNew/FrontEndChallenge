(function () {
  'use strict';

  angular
    .module('thortfulApp')
    .component('repoDetail', {
      templateUrl: 'js/components/repo-detail/repo-detail.template.html',
      controller: RepoDetailController
    });

  RepoDetailController.$inject = ['$scope', '$element', '$timeout', 'selectionService'];

  var CHART_COLORS = ['#ff6900', '#54668e', '#2da98d', '#fd7f82'];

  function RepoDetailController($scope, $element, $timeout, selectionService) {
    var vm = this;

    vm.store = selectionService.store;
    vm.chart = null;

    vm.$onInit = activate;
    vm.$onDestroy = destroy;

    function activate() {
      selectionService.onChange(renderChart);
    }

    function destroy() {
      if (vm.chart) {
        vm.chart.destroy();
        vm.chart = null;
      }
    }

    function chartData(repo) {
      return {
        labels: ['Stars', 'Forks', 'Watchers', 'Open issues'],
        datasets: [{
          label: repo.full_name,
          data: [
            repo.stargazers_count,
            repo.forks_count,
            repo.subscribers_count != null ? repo.subscribers_count : repo.watchers_count,
            repo.open_issues_count
          ],
          backgroundColor: CHART_COLORS,
          borderRadius: 8,
          maxBarThickness: 56
        }]
      };
    }

    function renderChart(repo) {
      if (!repo) {
        return;
      }

      $timeout(function () {
        var canvas = $element[0].querySelector('.repo-chart');
        if (!canvas || typeof Chart === 'undefined') {
          return;
        }

        if (vm.chart) {
          vm.chart.data = chartData(repo);
          vm.chart.update();
          return;
        }

        vm.chart = new Chart(canvas, {
          type: 'bar',
          data: chartData(repo),
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#22304a',
                padding: 12,
                titleFont: { family: 'Roboto', weight: '700' },
                bodyFont: { family: 'Roboto' }
              }
            },
            scales: {
              x: { grid: { display: false }, ticks: { font: { family: 'Roboto', weight: '500' }, color: '#54668e' } },
              y: { beginAtZero: true, precision: 0, ticks: { font: { family: 'Roboto' }, color: '#54668e' }, grid: { color: '#eceef4' } }
            }
          }
        });
      });
    }
  }
})();
