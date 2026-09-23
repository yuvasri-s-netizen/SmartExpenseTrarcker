import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        ExpenseManager manager = new ExpenseManager();

        while (true) {

            System.out.println("\n===== SMART EXPENSE TRACKER =====");
            System.out.println("1. Add Expense");
            System.out.println("2. View Expenses");
            System.out.println("3. View Total Expense");
            System.out.println("4. Exit");

            System.out.print("Enter your choice: ");
            int choice = sc.nextInt();
            sc.nextLine();

            if (choice == 1) {

                System.out.print("Enter date (DD-MM-YYYY): ");
                String date = sc.nextLine();

                System.out.print("Enter category: ");
                String category = sc.nextLine();

                System.out.print("Enter amount: ");
                double amount = sc.nextDouble();
                sc.nextLine();

                System.out.print("Enter description: ");
                String description = sc.nextLine();

                Expense expense =
                        new Expense(date, category, amount, description);

                manager.addExpense(expense);

            } else if (choice == 2) {

                manager.showExpenses();

            } else if (choice == 3) {

                manager.showTotalExpense();

            } else if (choice == 4) {

                System.out.println("Thank you for using Smart Expense Tracker!");
                break;

            } else {

                System.out.println("Invalid choice!");
            }
        }

        sc.close();
    }
}