
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function orNotListed(value) {
  return value === '------' || value === 'N/A' || value === undefined ? 'Not listed' : value;
}

function showTable(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Use a real HTML <table>, with <th> header cells and a <caption> saying what the table shows
  // - Include the 4-6 most useful fields
  // - Show "Not listed" instead of undefined when a value is missing
  // - Optional: add sorting
  /*html*/ 

  const tableHTML = data
    .map(
      (inspection) => `
                <tr>
                    <td>${inspection.name}</td>
                    <td>${orNotListed(inspection.category)}</td>
                    <td>${formatDate(inspection.inspection_date)}</td>
                    <td>${inspection.address_line_1}, ${inspection.city}</td>
                    <td>${orNotListed(inspection.rodent_and_insects)}</td>
                </tr>
            `
    )
    .join("");

  return `
                <h2 class="view-title">📊 Table View</h2>
                <p class="view-description">Scans inspections by type of food place, location, inspection date, and if they had no rodents and insects.</p>
                
                <table class="restaurant-table">
                    <caption>For specific users who are heavily afraid of rodents and insects and want to eat in Prince George's County.</caption>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Address</th>
                            <th scope="col">Date of Inspection</th>
                            <th scope="col">Rodent & Insect Result</th>
                        <tr>
                    </thead>
                    <tbody>${tableHTML}</tbody>
                </table>
            `;
}

export default showTable;