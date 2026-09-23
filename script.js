const form = document.getElementById("expenseForm");
const table = document.getElementById("expenseTable");
const totalEl = document.getElementById("totalExpense");
const countEl = document.getElementById("expenseCount");
const emptyEl = document.getElementById("empty");
const filterEl = document.getElementById("filter");
const dateEl = document.getElementById("date");

let expenses = JSON.parse(localStorage.getItem("smartExpenses") || "[]");

dateEl.value = new Date().toISOString().split("T")[0];

function save() {
  localStorage.setItem("smartExpenses", JSON.stringify(expenses));
}

function render() {
  const filter = filterEl.value;
  const visible = filter === "All"
    ? expenses
    : expenses.filter(e => e.category === filter);

  table.innerHTML = "";
  emptyEl.style.display = visible.length ? "none" : "block";

  visible.forEach((expense) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.category}</td>
      <td>${escapeHtml(expense.description)}</td>
      <td>₹${Number(expense.amount).toFixed(2)}</td>
      <td><button class="delete" data-id="${expense.id}">Delete</button></td>
    `;
    table.appendChild(row);
  });

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  totalEl.textContent = `₹${total.toFixed(2)}`;
  countEl.textContent = expenses.length;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  expenses.push({
    id: Date.now(),
    date: dateEl.value,
    category: document.getElementById("category").value,
    amount: document.getElementById("amount").value,
    description: document.getElementById("description").value.trim()
  });

  save();
  form.reset();
  dateEl.value = new Date().toISOString().split("T")[0];
  render();
});

table.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete")) return;
  const id = Number(event.target.dataset.id);
  expenses = expenses.filter(e => e.id !== id);
  save();
  render();
});

filterEl.addEventListener("change", render);
render();
