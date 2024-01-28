document.addEventListener('DOMContentLoaded', function() {
    // Sample data (replace with your actual data)
    const selectedPlants = ['sunflower', 'rose', 'rudabaga', 'sunflower', 'rose']

    // Display the plot using Plotly
    plants = createPlantsDataFrame(selectedPlants);
    displayPlot(plants);
});


function createPlantsDataFrame(selectedPlants) {
    tallPlants = ['sunflower']

    // Create plants dataFrame
    const plantNum = selectedPlants.length;
    const imageList = [];
    const yCoord = new Array(plantNum).fill(0);

    for (let i = 0; i < plantNum; i++) {
        const plant = selectedPlants[i];
        const image = `images/${plant}.png`;
        imageList.push(image);

        // If the plant is a tall plant, raise it up
        if (tallPlants.includes(plant)) {
            yCoord[i] = 1;
        }
    }

    const plants = {
        'plant_name': selectedPlants,
        'xData': Array.from({ length: plantNum }, (_, i) => i + 1),
        'yData': yCoord,
        'imageUrls': imageList,
        'info': selectedPlants.map(plant => `Info ${plant}`)
    };

    return plants;
}


function displayPlot(plants) {
    const trace = {
        x: plants.xData,
        y: plants.yData,
        mode: 'markers',
        marker: {
            symbol: 'circle',
            size: 10,
            color: 'red',
            opacity: 0.7,
            // Set the array of image URLs for each data point
            images: plants.imageUrls.map(url => ({
                source: url,
                x: plants.xData[plants.imageUrls.indexOf(url)],
                y: plants.yData[plants.imageUrls.indexOf(url)],
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