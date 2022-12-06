import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Radio {
    public static void main(String[] args) {
        try {
            pt1();
            pt2();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    private static void pt1() throws FileNotFoundException {
        Scanner file = new Scanner(new File("resources/radio.txt"));
        while (file.hasNext()) {
            String line = file.nextLine();
            boolean sequenceFound = false;
            Character first, second, third, fourth;
            while (!sequenceFound) {
                for (int i = 0; i < line.length()-3; i++){
                    first = line.charAt(i);
                    second = line.charAt(i+1);
                    third = line.charAt(i+2);
                    fourth = line.charAt(i+3);

                    if (!areTheSame(first, second, third, fourth)){
                        sequenceFound = true;
                        System.out.println(i+4);
                        break;

                    }
                }
            }
        }
    }

    private static void pt2() throws FileNotFoundException {
        Scanner file = new Scanner(new File("resources/radio.txt"));
        while (file.hasNext()) {
            String line = file.nextLine();
            boolean sequenceFound = false;
            Character first, second, third, fourth;
            while (!sequenceFound) {
                for (int i = 0; i < line.length()-14; i++){
                    Character[] sequence = new Character[14];
                    sequence[0] = line.charAt(i);
                    sequence[1] = line.charAt(i+1);
                    sequence[2] = line.charAt(i+2);
                    sequence[3] = line.charAt(i+3);
                    sequence[4] = line.charAt(i+4);
                    sequence[5] = line.charAt(i+5);
                    sequence[6] = line.charAt(i+6);
                    sequence[7] = line.charAt(i+7);
                    sequence[8] = line.charAt(i+8);
                    sequence[9] = line.charAt(i+9);
                    sequence[10] = line.charAt(i+10);
                    sequence[11] = line.charAt(i+11);
                    sequence[12] = line.charAt(i+12);
                    sequence[13] = line.charAt(i+13);

                    if (!areTheSame(sequence)){
                        sequenceFound = true;
                        System.out.println(i+14);
                        break;

                    }
                }
            }
        }
    }

    private static boolean areTheSame(Character a, Character b, Character c, Character d) {
        if (a.equals(b) || a.equals(c) || a.equals(d) || b.equals(c) || b.equals(d) || c.equals(d)) {
            return true;
        } else {
            return false;
        }
    }
    private static boolean areTheSame(Character[] sequence) {
       for (int i = 0; i < sequence.length; i++) {
           for (int j = i+1; j < sequence.length; j++) {
               if (sequence[i].equals(sequence[j])) {
                   return true;
               }
           }
       }
       return false;
    }
}