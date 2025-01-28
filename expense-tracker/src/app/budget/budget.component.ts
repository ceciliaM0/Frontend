import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import * as XLSX from 'xlsx';

Chart.register(...registerables);

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class BudgetComponent {
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  currentDay: string = 'Monday';
  viewSummary: boolean = false;
  weeklyBudget: number | null = null;

  expensesByDay: { [key: string]: { category: string; amount: number }[] } = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  newExpense = { category: '', amount: 0 };
  editingIndex: number | null = null;
  pieChart: any;

  ngAfterViewChecked() {
    const ctx = document.getElementById('expensePieChart') as HTMLCanvasElement;
    if (this.viewSummary && !this.pieChart && ctx) {
      console.log('Rendering pie chart...');
      this.renderPieChart();
    }
  }

  renderPieChart() {
    const categories = this.getCategoriesWithTotals();
    const ctx = document.getElementById('expensePieChart') as HTMLCanvasElement;

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(categories),
        datasets: [
          {
            data: Object.values(categories),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }

  getCategoriesWithTotals() {
    const categoryTotals: { [key: string]: number } = {};

    Object.values(this.expensesByDay).flat().forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    return categoryTotals;
  }

  get dailyExpenses() {
    return this.expensesByDay[this.currentDay];
  }

  get weeklySummary() {
    return Object.entries(this.expensesByDay).flatMap(([day, expenses]) =>
      expenses.map(expense => ({ day, ...expense }))
    );
  }

  get nextDayLabel(): string {
    const currentIndex = this.days.indexOf(this.currentDay);
    return this.days[(currentIndex + 1) % this.days.length];
  }

  get previousDayLabel(): string {
    const currentIndex = this.days.indexOf(this.currentDay);
    return this.days[(currentIndex - 1 + this.days.length) % this.days.length];
  }

  addExpense() {
    if (this.newExpense.category && this.newExpense.amount > 0) {
      if (this.editingIndex !== null) {
        this.dailyExpenses[this.editingIndex] = { ...this.newExpense };
        this.editingIndex = null;
      } else {
        this.dailyExpenses.push({ ...this.newExpense });
      }
      this.newExpense = { category: '', amount: 0 };
    }
  }

  editExpense(expense: any, index: number) {
    this.newExpense = { ...expense };
    this.editingIndex = index;
  }

  deleteExpense(index: number) {
    this.dailyExpenses.splice(index, 1);
  }

  calculateDailyTotal() {
    return this.dailyExpenses.reduce((total, expense) => total + expense.amount, 0);
  }

  toggleSummary() {
    this.viewSummary = !this.viewSummary;
  }

  changeDay(day: string) {
    this.currentDay = day;
    this.editingIndex = null;
  }

  nextDay() {
    const currentIndex = this.days.indexOf(this.currentDay);
    this.currentDay = this.days[(currentIndex + 1) % this.days.length];
    this.editingIndex = null;
  }

  previousDay() {
    const currentIndex = this.days.indexOf(this.currentDay);
    this.currentDay = this.days[(currentIndex - 1 + this.days.length) % this.days.length];
    this.editingIndex = null;
  }

  calculateWeeklyTotal() {
    return Object.values(this.expensesByDay).reduce(
      (total, expenses) => total + expenses.reduce((dayTotal, exp) => dayTotal + exp.amount, 0),
      0
    );
  }

  calculateWeeklySavings(): number {
    const totalExpenses = this.calculateWeeklyTotal();
    return this.weeklyBudget ? this.weeklyBudget - totalExpenses : 0;
  }

  setBudget(value: number) {
    this.weeklyBudget = value;
  }

  exportToExcel() {
    const data: { Day: string; Category: string; Amount: number }[] = [];

    for (const day of this.days) {
      const dayExpenses = this.expensesByDay[day] || [];
      dayExpenses.forEach((expense) => {
        data.push({
          Day: day,
          Category: expense.category,
          Amount: expense.amount,
        });
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Weekly Expenses');

    XLSX.writeFile(workbook, 'Weekly_Expenses.xlsx');
  }
}
