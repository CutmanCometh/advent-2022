import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class RuckSackPriority {
    public static void main(String[] args) throws FileNotFoundException {
        Scanner file = new Scanner(new File("resources/rucksack.txt"));
        int sum = 0;
        String priorities = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        while (file.hasNext()) {
            String line = file.nextLine();
            String first = line.substring(0, line.length()/2);
            int[] firstCount = new int[priorities.length()];
            String last = line.substring(line.length()/2);
            int[] lastCount = new int[priorities.length()];

            for (int i = 0; i < first.length(); i++){
                firstCount[priorities.indexOf(first.charAt(i))]++;
            }
            for (int i = 0; i < last.length(); i++) {

                lastCount[priorities.indexOf(last.charAt(i))]++;
            }

            for (int i = 0; i < lastCount.length; i++) {
                if (lastCount[i] > 0 && firstCount[i] > 0) {
                    sum += priorities.indexOf(priorities.charAt(i));
                }
            }
        }
        file.close();
        System.out.println(sum);

    }
}