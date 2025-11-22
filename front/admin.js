console.log('Hello Admin');

const ws = new WebSocket('ws://localhost:3000');

const $clientsTableBody = document.getElementById('clients-table-body');

ws.onopen = function onOpen() {
  console.log('WebSocket connection established');
  ws.send(
    JSON.stringify({
      type: 'set_admin',
    })
  );
};

ws.onerror = function onError(error) {
  console.error('WebSocket error:', error);
};

ws.onmessage = function onMessage(event) {
  console.log('Message from server:', event.data);

  try {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case 'client_list': {
        renderClientList(message.data);
        break;
      }
    }
  } catch (error) {
    console.error('Error parsing message:', error);
  }
};

ws.onclose = function onClose() {
  console.log('WebSocket connection closed');
};

function renderClientList(clients) {
  $clientsTableBody.innerHTML = '';
  const adminRows = [];
  const userRows = [];
  clients.forEach((client) => {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = client.id;
    const isAdminCell = document.createElement('td');
    isAdminCell.textContent = client.isAdmin ? 'Yes' : 'No';
    row.appendChild(idCell);
    row.appendChild(isAdminCell);
    if (client.isAdmin) {
      adminRows.push(row);
    } else {
      userRows.push(row);
    }
  });
  adminRows.forEach((row) => {
    $clientsTableBody.appendChild(row);
  });
  userRows.forEach((row) => {
    $clientsTableBody.appendChild(row);
  });
}
