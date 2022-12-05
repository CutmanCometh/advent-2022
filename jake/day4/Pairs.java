import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Pairs {
        public static void main(String[] args) {
            try {
                pt1();
                pt2();
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            }
        }

        private static void pt1() throws FileNotFoundException {
            Scanner file = new Scanner(new File("resources/pairs.txt"));
            int coveredPairs = 0;
            while (file.hasNext()) {
                String line = file.nextLine();
                String[] pairs = line.split(",");
                Elf elf1 = new Elf(pairs[0]);
                Elf elf2 = new Elf(pairs[1]);

                if (((elf1.lowest <= elf2.lowest) && (elf1.biggest >= elf2.biggest))
                        || ((elf2.lowest <= elf1.lowest) && (elf2.biggest >= elf1.biggest))){
                    coveredPairs++;
                }
            }
            System.out.println("coveredPairs: " + coveredPairs);
        }

    private static void pt2() throws FileNotFoundException {
        Scanner file = new Scanner(new File("resources/pairs.txt"));
        int overlappedPairs = 0;
        while (file.hasNext()) {
            String line = file.nextLine();
            String[] pairs = line.split(",");
            Elf elf1 = new Elf(pairs[0]);
            Elf elf2 = new Elf(pairs[1]);

            if (((elf1.lowest <= elf2.lowest) && (elf1.biggest >= elf2.lowest))
                    || ((elf2.lowest <= elf1.lowest) && (elf2.biggest >= elf1.lowest))){
                overlappedPairs++;
            }
        }
        System.out.println("overlappedPairs: " + overlappedPairs);
    }

    private static class Elf {
        private int lowest;
        private int biggest;

        public Elf(String s) {
            String[] nums = s.split("-");
            lowest = Integer.parseInt(nums[0]);
            biggest = Integer.parseInt(nums[1]);

        }
    }


}