/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories
 */

  function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function orNotListed(value) {
  return value === '------' || value === 'N/A' || value === undefined ? 'Not listed' : value;
  }

  const check = ["food_from_approved_source", 
    "food_protected_from", "ill_workers_restricted", "proper_hand_washing",
    "cooling_time_and_temperature", "cold_holding_temperature", "hot_holding_temperature", "cooking_time_and_temperature", 
    "reheating_time_and_temperature", "hot_and_cold_running_water", "proper_sewage_disposal", "no_bare_hand_contact",
     "adequate_hand_washing", "rodent_and_insects", "food_contact_surfaces_and",
  ];

  function countFailed(inspection){
    return check.filter((field) => inspection[field] === "Out of Compliance").length;
  }

function showCategories(data) {
  // Requirements:
  // - Group data by one meaningful field (category, city, inspection result, etc.)
  // - Show how many records are in each group, plus one other number per group
  //   (an average, a highest, a lowest)
  // - Show items within each group
  // - Make the groups easy to compare, and visually distinct from their items
  /*html*/

  const groups = {};
  data.forEach((item) => {
    const key = orNotListed(item.inspection_results);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });
  
  const sections = Object.entries(groups)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([name, items]) => {
      const totalFailed = items.reduce((sum, item) => sum + countFailed(item), 0);
      const avg = (totalFailed / items.length).toFixed(1);

      const categoriesHTML = items
        .map(
          (item) => `
            <div class="category-item">
              <span>${item.name}, ${orNotListed(item.city)}</span>
              <span>${formatDate(item.inspection_date)}</span>
            </div>`
        )
        .join("");

      return `
        <section class="category-section">
          <h3 class="category-header">
            ${name} · ${items.length} inspections · Average ${avg} failed checks
          </h3>
          <div class="category-items">${categoriesHTML}</div>
        </section>`;
    })
    .join("");

  return `
    <h2 class="view-title">📂 Category View</h2>
    <p class="view-description">Inspections grouped by result, with the average number of failed checks</p>
    ${sections}
  `;
}


export default showCategories;