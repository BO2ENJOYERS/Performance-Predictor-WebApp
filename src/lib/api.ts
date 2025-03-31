// Function to fetch columns from the database
export async function fetchColumns() {
  const response = await fetch('/api/columns');
  const data = await response.json();
  return data;
}

// Function to fetch player data
export async function fetchPlayers() {
  const response = await fetch('/api/players');
  const data = await response.json();
  return { players: data.players }; // Assuming the API sends player data and total count
}
