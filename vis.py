import pandas as pd
import plotly.express as px



# List of plants that go on upper level
tall_plants = ['sunflower']


def on_click(sel):
    # Display information for the clicked plant
    x, y = sel.target
    ind = int(x) - 1  # Convert x-coordinate to index
    print(plants['info'].iloc[ind])


def create_plants_df(selected_plants):
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
        'image_url': image_list,
        'info': [f'Info {plant}' for plant in selected_plants]
    })

    return plants

def update_plot(selected_plants):

    global plants
    plants = create_plants_df(selected_plants)

    # Create a Plotly scatter plot
    fig = px.scatter(plants, x='x_coordinate', y='y_coordinate', color=plants.index,
                     hover_name='plant_name', hover_data=['info'],
                     text='plant_name')



    # Images replace points
    for i, (x, y, img_path) in enumerate(plants[['x_coordinate', 'y_coordinate', 'image_url']].itertuples(index=False)):
        fig.add_layout_image(
            source=img_path,
            x=x, y=y,
            xanchor="center", yanchor="middle",
            sizex=0.15, sizey=0.15,
            opacity=1,
            layer="above"
        )

    # Update layout
    fig.update_layout(
        title_text='Your Plot',
        xaxis=dict(tickvals=plants['x_coordinate'], ticktext=plants['plant_name']),
        yaxis=dict(visible=False),
    )

    # Save the plot as an HTML file
    fig.write_html('templates/plot.html')
    # Plot styling


    #plt.ylim(-1,2)

# Example of updating the plot
update_plot(['sunflower', 'rose', 'rudabaga', 'sunflower', 'rose'])