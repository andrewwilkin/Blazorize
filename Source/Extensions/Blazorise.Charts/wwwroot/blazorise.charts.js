window.blazoriseCharts = {
    _instances: [],

    initialize: (dotnetAdapter, chartCallbacks, canvasId, type, data, options, dataJsonString, optionsJsonString) => {
        if (dataJsonString)
            data = JSON.parse(dataJsonString);

        if (optionsJsonString)
            options = JSON.parse(optionsJsonString);

        // search for canvas element
        const canvas = document.getElementById(canvasId);

        if (canvas) {
            let chart = new Chart(canvas, {
                type: type,
                data: data,
                options: options
            });

            // save references to all elements
            window.blazoriseCharts._instances[canvasId] = {
                dotNetRef: dotnetAdapter,
                canvas: canvas,
                chart: chart
            };

            window.blazoriseCharts.wireEvents(dotnetAdapter, chartCallbacks, canvas, chart);
        }

        return true;
    },

    destroy: (canvasId) => {
        var instances = window.blazoriseCharts._instances || {};

        const chart = instances[canvasId].chart;

        if (chart) {
            chart.destroy();
        }

        delete instances[canvasId];

        return true;
    },

    update: (canvasId, data, options, dataJsonString, optionsJsonString) => {
        if (dataJsonString)
            data = JSON.parse(dataJsonString);

        if (optionsJsonString)
            options = JSON.parse(optionsJsonString);

        const chart = window.blazoriseCharts.getChart(canvasId);

        if (chart) {
            chart.data = data;
            chart.options = options;
            chart.update();
        }

        return true;
    },

    wireEvents: (dotnetAdapter, chartCallbacks, canvas, chart) => {
        //console.log(chartCallbacks);
        if (chartCallbacks.hasClickEvent) {
            //console.log('wiring click event');
            canvas.onclick = function (evt) {
                var elemetn = chart.getElementsAtEvent(evt);

                for (var i = 0; i < elemetn.length; i++) {
                    const datasetIndex = elemetn[i]["_datasetIndex"];
                    const index = elemetn[i]["_index"];
                    const model = elemetn[i]["_model"];

                    dotnetAdapter.invokeMethodAsync("Event", "click", datasetIndex, index, JSON.stringify(model));
                }
            };
        }

        if (chartCallbacks.hasHoverEvent) {
            chart.config.options.onHover = function (evt) {
                var element = chart.getElementsAtEvent(evt);

                for (var i = 0; i < element.length; i++) {
                    const datasetIndex = element[i]["_datasetIndex"];
                    const index = element[i]["_index"];
                    const model = element[i]["_model"];

                    dotnetAdapter.invokeMethodAsync("Event", "hover", datasetIndex, index, JSON.stringify(model));
                }
            };
        }

        if (chartCallbacks.chartCallbacksTooltips.hasItemSorting) {
            console.log('Wiring In Tooltip Item Sorting');
            chart.config.options.tooltips.mode = 'index';
            chart.config.options.tooltips.intersect = true;
            chart.config.options.tooltips.itemSort = function (a, b) {
                console.log('In JS function');
                console.log(a.datasetIndex);
                console.log(b.datasetIndex);

                return dotnetAdapter.invokeMethodAsync("TooltipItemSortHandler", JSON.stringify(a), JSON.stringify(b))
                    .then( function(r) { return r });

                return -1;
                //console.log(result);
                //return result;
                //return dotnetAdapter.invokeMethodAsync("TooltipItemSortHandler", a, b);    
            }
        }
    },

    getChart: (canvasId) => {
        let chart = null;

        Chart.helpers.each(Chart.instances, function (instance) {
            if (instance.chart.canvas.id === canvasId) {
                chart = instance.chart;
            }
        });

        return chart;
    }
};
