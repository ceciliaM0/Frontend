import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ExpenseListComponent {
  @Input() currentDay: string = '';
  @Input() dailyExpenses: any[] = [];
  @Output() expenseDeleted = new EventEmitter<any>();

  newExpense = {
    category: '',
    amount: 0
  };

  editingIndex: number | null = null;

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

  editExpense(expense: any) {
    this.editingIndex = this.dailyExpenses.indexOf(expense);
    this.newExpense = { ...expense };
  }

  deleteExpense(expense: any) {
    this.dailyExpenses = this.dailyExpenses.filter(e => e !== expense);
    this.expenseDeleted.emit(expense);
  }

  calculateTotal(): number {
    return this.dailyExpenses.reduce((total, expense) => total + expense.amount, 0);
  }
  
  
}
