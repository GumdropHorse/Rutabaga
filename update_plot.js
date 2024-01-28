document.addEventListener('DOMContentLoaded', function() {
    // Sample data (replace with your actual data)
    const plotData = {
        xData: [1, 2, 3, 4],
        yData: [1, 1, 0, 0],
        imageUrls: [
            'images/rose.png',
            'images/rose.png',
            'images/rose.png',
            'images/rose.png'
        ]
    };

    // Display the plot using Plotly
    displayPlot(plotData);
});

function displayPlot(plotData) {
    const trace = {
        x: plotData.xData,
        y: plotData.yData,
        mode: 'markers',
        marker: {
            symbol: 'circle',
            size: 10,
            color: 'red',
            opacity: 0.7,
            // Set the array of image URLs for each data point
            images: plotData.imageUrls.map(url => ({
                source: url,
                x: plotData.xData[plotData.imageUrls.indexOf(url)],
                y: plotData.yData[plotData.imageUrls.indexOf(url)],
                sizex: 20,
                sizey: 20,
                xanchor: 'center',
                yanchor: 'center'
            }))
        }
    };

    const layout = {
        title: 'Overlay Images on Plotly',
        xaxis: { title: 'X-axis' },
        yaxis: { title: 'Y-axis' }
    };
    Plotly.newPlot('plot-container', [trace], layout);
}