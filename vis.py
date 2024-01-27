import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.offsetbox import OffsetImage, AnnotationBbox

# List of plants that go on upper level
tall_plants = ['sunflower']

def update_plot(selected_plants):
    
    # Create plants dataFrame
    plant_num = len(selected_plants)
    image_list = []
    y_coord = [0] * plant_num
    for i, plant in enumerate (selected_plants):
        image = f"images/{plant}.png"
        image_list.append(image)

        # If the plant is a tall plant it instead raises it up
        if plant in tall_plants:
            y_coord[i] = 1


    plants = pd.DataFrame({
        'plant_name': selected_plants,
        'x_coordinate': list(range(1, plant_num+1)),
        'y_coordinate': y_coord,
        'image_url': image_list
    })

    # Create scatter plot
    plt.figure(figsize=(8, 6))
    plt.scatter(plants['x_coordinate'], plants['y_coordinate'], s=0,
     c=range(len(plants)), cmap='viridis') # Colors are here for testing purposes


    # Images replace points
    for i, (x, y, img_path) in enumerate(plants[['x_coordinate', 'y_coordinate', 'image_url']].itertuples(index=False)):
        img = plt.imread(img_path)
        imagebox = OffsetImage(img, zoom=0.15)  # zoom factor
        plt.gca().add_artist(AnnotationBbox(imagebox, (x, y), frameon=False, pad=0))

    # Plot styling
    plt.title('Your Plot')
    plt.xticks([])
    plt.yticks([])
    plt.gca().spines['top'].set_visible(False)
    plt.gca().spines['right'].set_visible(False)
    plt.gca().spines['bottom'].set_visible(False)
    plt.gca().spines['left'].set_visible(False)
    plt.ylim(-1,2)

    for i, txt in enumerate(plants['plant_name']):
        plt.annotate(txt, (plants['x_coordinate'].iloc[i], plants['y_coordinate'].iloc[i]), ha='right')

    # Display the plot
    plt.legend()
    plt.show()

# Example of updating the plot
update_plot(['sunflower', 'rose', 'rudabaga'])