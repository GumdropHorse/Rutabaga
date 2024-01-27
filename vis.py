import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.offsetbox import OffsetImage, AnnotationBbox

df = pd.DataFrame({
    'plant_name': ['Rose', 'Rudabaga', 'Sunflower'],
    'x_coordinate': [1, 2, 3],
    'y_coordinate': [1, 1, 1],
    'image_url': ['images/rose.png', 'images/rudabaga.png', 'images/sunflower.png']
})

def update_plot(selected_plants):
    # Filter the DataFrame based on selected plants
    filtered_df = df[df['plant_name'].isin(selected_plants)]

    # Order the DataFrame based on the order of selected plants
    filtered_df['x_coordinate'] = filtered_df['plant_name'].map({plant: i+1 for i, plant in enumerate(selected_plants)})


    # Create scatter plot
    plt.figure(figsize=(8, 6))
    plt.scatter(filtered_df['x_coordinate'], filtered_df['y_coordinate'], s=100,
     label='Selected Plants', c=range(len(filtered_df)), cmap='viridis')


    # Images replace points
    for i, (x, y, img_path) in enumerate(filtered_df[['x_coordinate', 'y_coordinate', 'image_url']].itertuples(index=False)):
        img = plt.imread(img_path)
        imagebox = OffsetImage(img, zoom=0.15)  # zoom factor
        plt.gca().add_artist(AnnotationBbox(imagebox, (x, y), frameon=False, pad=0))

    # Labels and title
    plt.xlabel('X Coordinate')
    plt.ylabel('Y Coordinate')
    plt.title('Garden Visualization')

    for i, txt in enumerate(filtered_df['plant_name']):
        plt.annotate(txt, (filtered_df['x_coordinate'].iloc[i], filtered_df['y_coordinate'].iloc[i]), ha='right')

    # Display the plot
    plt.legend()
    plt.show()

# Example of updating the plot
update_plot(['Sunflower', 'Rose', 'Rudabaga', 'Rudabaga'])