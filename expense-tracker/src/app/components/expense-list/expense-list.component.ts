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
  @Input() dailyExpenses: any[] = []; // Cheltuieli din ziua curentă
  @Output() expenseDeleted = new EventEmitter<any>(); // Emite evenimentul la ștergere

  newExpense = {
    category: '',
    amount: 0
  };

  editingIndex: number | null = null;

  addExpense() {
    if (this.newExpense.category && this.newExpense.amount > 0) {
      if (this.editingIndex !== null) {
        // Actualizează cheltuiala existentă
        this.dailyExpenses[this.editingIndex] = { ...this.newExpense };
        this.editingIndex = null; // Resetează indexul după editare
      } else {
        // Adaugă o cheltuială nouă
        this.dailyExpenses.push({ ...this.newExpense });
      }
      this.newExpense = { category: '', amount: 0 }; // Resetează formularul
    }
  }

  editExpense(expense: any) {
    this.editingIndex = this.dailyExpenses.indexOf(expense); // Obține indexul cheltuielii
    this.newExpense = { ...expense }; // Setează datele în formular
  }

  deleteExpense(expense: any) {
    this.dailyExpenses = this.dailyExpenses.filter(e => e !== expense); // Șterge cheltuiala
    this.expenseDeleted.emit(expense); // Notifică părintele
  }

  calculateTotal(): number {
    return this.dailyExpenses.reduce((total, expense) => total + expense.amount, 0);
  }
  
  
}
