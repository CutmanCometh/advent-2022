import edu.princeton.cs.algs4.MaxPQ;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class CalorieCounter {
    public static void main(String[] args) throws FileNotFoundException {
        Scanner file = new Scanner(new File("resources/elfCalories.txt"));
        MaxPQ<Integer> sortedCalories = new MaxPQ<>();
        int sum = 0;

        while (file.hasNext()) {
            String line = file.nextLine();
            if (!line.isEmpty()) {
                int cal = Integer.parseInt(line);
                sum += cal;
            } else {
                sortedCalories.insert(sum);
                sum = 0;
            }
        }
        file.close();

        int biggest = sortedCalories.delMax();
        System.out.println("biggest: " + biggest);

        int biggest3 = biggest + sortedCalories.delMax() + sortedCalories.delMax();
        System.out.println("biggest 3: " + biggest3);

    }
}
