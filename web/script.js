// public/scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/items')
      .then(response => response.json())
      .then(data => {
        const itemsList = document.getElementById('itemsList');
        data.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item._name; // Replace 'name' with your actual data property
          itemsList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error:', error));
  });
  