/**
 * CHARTS VIEW - STUDENTS IMPLEMENT
 * Show patterns in your data as charts, using Chart.js
 *
 * This view has two parts:
 *   showCharts(data) returns the HTML: one <canvas> per chart, with a text alternative under each
 *   drawCharts(data) runs after that HTML is on the page, and draws a chart into each <canvas>
 *
 * Chart.js docs: https://www.chartjs.org/docs/latest/getting-started/
 */

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

function showCharts(data) {
  // TODO: Replace each TODO sentence below with text that says what that chart shows.
  // Charts are drawn as pictures, so screen readers can't read them.
  /*html*/
  return `
                <h2 class="view-title">📈 Charts View</h2>
                <p class="view-description">Patterns in the data at a glance</p>
                <div class="charts-grid">
                    <figure class="chart-figure">
                        <canvas id="chart-one"></canvas>
                        <figcaption class="chart-summary">A bar chart showing what type of business has the most failed inspections.</figcaption>
                    </figure>
                    <figure class="chart-figure">
                        <canvas id="chart-two"></canvas>
                        <figcaption class="chart-summary">A pie chart displaying the type of inspection that failed the most.</figcaption>
                    </figure>
                </div>
            `;
}

function drawCharts(data) {
  // Chart.js is loaded by a <script> tag in index.html. If it didn't load, say so instead of breaking.
  if (typeof Chart === 'undefined') {
    document.querySelector('.charts-grid').innerHTML =
      '<p class="error">Chart.js did not load, so the charts can\'t be drawn. Check the &lt;script&gt; tag in index.html.</p>';
    return;
  }

  // TODO 1: Reshape your data for the first chart.
  // Chart.js doesn't take your array of records.
  // It wants a list of labels and a matching list of numbers.
  // Example: count inspections by type of business.
  //
    const counts = {};
    data.forEach((item) => {
      const category = orNotListed(item.category);;
      if (countFailed(item) > 0){
        counts[category] = (counts[category] || 0) + 1;
      }
    });
    const labels = Object.keys(counts);
    const numbers = Object.values(counts);

  // TODO 2: Draw the first chart into <canvas id="chart-one">.
  // Every chart needs a title, and every axis needs a label.
  //
    new Chart(document.querySelector('#chart-one'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{ label: 'Number of failed inspections', data: numbers }]
      },
      options: {
        plugins: { title: { display: true, text: 'Businesses With the Most Failed Inspections' } },
        scales: {
          x: { title: { display: true, text: 'Type of business' } },
          y: { title: { display: true, text: 'FailedInspections' }, beginAtZero: true }
        }
      }
    });

  // TODO 3: Reshape your data again, and draw a second chart of a DIFFERENT type
  // (pie, line, scatter...) into <canvas id="chart-two">, answering a different question.
  // Ideas: inspection results as a pie, inspections per month as a line,
  // or how many "Out of Compliance" checks each type of business averages.
  // A pie chart displaying the type of inspection that failed the most. <- reminder for what i'm making the chart for

  const counts2 = {};
  data.forEach((item) => {
      const inspectionType = orNotListed(item.inspection_results);
      if (countFailed(item) > 0){
        counts2[inspectionType] = (counts2[inspectionType] || 0) + 1;
      }
    });
    const labels2 = Object.keys(counts2);
    const numbers2 = Object.values(counts2);
    const y = Object.keys(counts);
    const z = Object.values(counts);

  new Chart(document.querySelector('#chart-two'), {
      type: 'pie',
      data: {
        labels: labels2,
        datasets: [{ label: 'Number of failed inspections', data: numbers2 }]
      },
      options: {
        plugins: {
        legend: {
          position: 'top',
          },
        title: {
          display: true,
          text: 'What Type of Inspection Failed the Most'
          }
        }
      }
    });
}


export { showCharts, drawCharts };
