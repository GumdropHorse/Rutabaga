document.addEventListener('DOMContentLoaded', () => {
    let items = [];
    let selectedItems = new Set();

    fetch('/api/items')
      .then(response => response.json())
      .then(data => {
        items = data;
        renderItems(items);

        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredItems = items.filter(item => item._name.toLowerCase().includes(searchTerm));
            renderItems(filteredItems);
        });

        const itemsList = document.getElementById('itemsList');
        itemsList.addEventListener('change', (event) => {
          const checkbox = event.target;
          const itemName = checkbox.value;

          if (checkbox.checked) {
            selectedItems.add(itemName);
          } else {
            selectedItems.delete(itemName);
          }
          console.log('Selected Items:', Array.from(selectedItems));
        });

        const toggleListButton = document.getElementById('toggleListButton');
            toggleListButton.addEventListener('click', () => {
            contentList.style.display = (contentList.style.display === 'none') ? 'block' : 'none';
            toggleListButton.style.display = (contentList.style.display === 'none') ? 'inline-block' : 'none';
        });

        const toggleNewListButton = document.getElementById('toggleNewListButton');
        const plotContainer = document.getElementById('plot-container');
        const infoContainer = document.getElementById('info-container');
        const Overall = document.getElementById('overall');
        if (!plotContainer) {
            console.error('Element with id "plot-container" not found.');
          }
        toggleNewListButton.addEventListener('click', () => {
            contentList.style.display = (contentList.style.display === 'none') ? 'block' : 'none';
            Overall.style.display = (Overall.style.display === 'none') ? 'inline-block' : 'none';
            plotContainer.style.display = (plotContainer.style.display === 'none') ? 'inline-block' : 'none';
            infoContainer.style.display = (infoContainer.style.display === 'none') ? 'inline-block' : 'none';
            console.log(selectedItems);
            let sendVis = Array.from(selectedItems);
            fetch('/api/process-list', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendVis),
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then(data => {
                console.log('Processed data from Python:', data.result);
                // Add logic to handle the processed data
              })
              .catch(error => {
                console.error('Error processing list:', error);
              });
            plotContainer.style.backgroundImage = '../images/plot.png'
        });
      })
      .catch(error => console.error('Error:', error));


      function renderItems(itemsToRender) {
        const itemsList = document.getElementById('itemsList');
        const currentCheckboxes = itemsList.querySelectorAll('input[type="checkbox"]');
        itemsList.innerHTML = '';
    
        itemsToRender.forEach(item => {
          /*const listItem = document.createElement('li');
          listItem.textContent = item._name;
          itemsList.appendChild(listItem);*/
          const listItem = document.createElement('li');

          // Create a checkbox
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = item._name; // Use a unique identifier as the value
          checkbox.checked = selectedItems.has(item._name);
          listItem.appendChild(checkbox);

          // Display item name
          const itemName = document.createElement('span');
          itemName.textContent = item._name; // Replace 'name' with your actual data property
          listItem.appendChild(itemName);

          itemsList.appendChild(listItem);
        });
      }
  });