import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Pt2 {
    public static void main(String[] args) throws FileNotFoundException {
        Scanner file = new Scanner(new File("resources/rucksack.txt"));
        int sum = 0;
        StringBuilder sb = new StringBuilder();
        String priorities = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        String badges = null;
        while (file.hasNext()) {
            String elf1 = file.nextLine();
            int[] elf1Count = new int[priorities.length()];
            String elf2 = file.nextLine();
            int[] elf2Count = new int[priorities.length()];
            String elf3 = file.nextLine();
            int[] elf3Count = new int[priorities.length()];

            for (int i = 0; i < elf1.length(); i++) {
                elf1Count[priorities.indexOf(elf1.charAt(i))]++;
            }
            for (int i = 0; i < elf2.length(); i++) {
                elf2Count[priorities.indexOf(elf2.charAt(i))]++;
            }
            for (int i = 0; i < elf3.length(); i++) {
                elf3Count[priorities.indexOf(elf3.charAt(i))]++;
            }

            for (int i = 0; i < priorities.length(); i++) {
                if (elf1Count[i] > 0 && elf2Count[i] > 0 && elf3Count[i] > 0) {
                    sb.append(priorities.charAt(i));
                }
            }
        }
        file.close();
        badges = sb.toString();

        for (int i = 0; i < badges.length(); i++) {
            sum += priorities.indexOf(badges.charAt(i));
        }
        System.out.println(sum);

    }
}
