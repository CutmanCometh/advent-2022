import edu.princeton.cs.algs4.Stack;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.Scanner;

public class Crane {

    private static Stack[] test = {
            new Stack<Character>(),
            new Stack<Character>(),
            new Stack<Character>()

    };
    private static Stack[] sample = {
            new Stack<Character>(),
            new Stack<Character>(),
            new Stack<Character>(),
            new Stack<Character>(),
            new Stack<Character>(),
            new Stack<Character>(),
            new Stack<Character>(),
            new Stack<Character>(),
            new Stack<Character>()
    };


    static StringBuilder sb = new StringBuilder();


    public static void main(String[] args) {
        try {
            pt1();
            pt2();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

    }


    private static void pt1() throws FileNotFoundException {
        sample[0].push('W');
        sample[0].push('B');
        sample[0].push('D');
        sample[0].push('N');
        sample[0].push('C');
        sample[0].push('F');
        sample[0].push('J');

        sample[1].push('P');
        sample[1].push('Z');
        sample[1].push('V');
        sample[1].push('Q');
        sample[1].push('L');
        sample[1].push('S');
        sample[1].push('T');

        sample[2].push('P');
        sample[2].push('Z');
        sample[2].push('B');
        sample[2].push('G');
        sample[2].push('J');
        sample[2].push('T');

        sample[3].push('D');
        sample[3].push('T');
        sample[3].push('L');
        sample[3].push('J');
        sample[3].push('Z');
        sample[3].push('B');
        sample[3].push('H');
        sample[3].push('C');

        sample[4].push('G');
        sample[4].push('V');
        sample[4].push('B');
        sample[4].push('J');
        sample[4].push('S');

        sample[5].push('P');
        sample[5].push('S');
        sample[5].push('Q');

        sample[6].push('B');
        sample[6].push('V');
        sample[6].push('D');
        sample[6].push('F');
        sample[6].push('L');
        sample[6].push('M');
        sample[6].push('P');
        sample[6].push('N');

        sample[7].push('P');
        sample[7].push('S');
        sample[7].push('M');
        sample[7].push('F');
        sample[7].push('B');
        sample[7].push('D');
        sample[7].push('L');
        sample[7].push('R');

        sample[8].push('V');
        sample[8].push('D');
        sample[8].push('T');
        sample[8].push('R');
        Scanner file = new Scanner(new File("resources/craneDirections.txt"));
        while (file.hasNext()) {
            String line = file.nextLine();
            String[] sliced = line.split(" ");


            Integer loopNum = Integer.parseInt(sliced[1]);
            Integer start = Integer.parseInt(sliced[3]);
            Integer end = Integer.parseInt(sliced[5]);
            moveBoxes(loopNum, start, end);
        }
        for (int i = 0; i < sample.length; i++) {
            sb.append(sample[i].pop());
        }
        String tops = sb.toString();
        System.out.println(tops);
    }

    private static void pt2() throws FileNotFoundException {

        test[0].push('Z');
        test[0].push('N');


        test[1].push('M');
        test[1].push('C');
        test[1].push('D');

        test[2].push('P');


        sb = new StringBuilder();
        sample[0].push('W');
        sample[0].push('B');
        sample[0].push('D');
        sample[0].push('N');
        sample[0].push('C');
        sample[0].push('F');
        sample[0].push('J');

        sample[1].push('P');
        sample[1].push('Z');
        sample[1].push('V');
        sample[1].push('Q');
        sample[1].push('L');
        sample[1].push('S');
        sample[1].push('T');

        sample[2].push('P');
        sample[2].push('Z');
        sample[2].push('B');
        sample[2].push('G');
        sample[2].push('J');
        sample[2].push('T');

        sample[3].push('D');
        sample[3].push('T');
        sample[3].push('L');
        sample[3].push('J');
        sample[3].push('Z');
        sample[3].push('B');
        sample[3].push('H');
        sample[3].push('C');

        sample[4].push('G');
        sample[4].push('V');
        sample[4].push('B');
        sample[4].push('J');
        sample[4].push('S');

        sample[5].push('P');
        sample[5].push('S');
        sample[5].push('Q');

        sample[6].push('B');
        sample[6].push('V');
        sample[6].push('D');
        sample[6].push('F');
        sample[6].push('L');
        sample[6].push('M');
        sample[6].push('P');
        sample[6].push('N');

        sample[7].push('P');
        sample[7].push('S');
        sample[7].push('M');
        sample[7].push('F');
        sample[7].push('B');
        sample[7].push('D');
        sample[7].push('L');
        sample[7].push('R');

        sample[8].push('V');
        sample[8].push('D');
        sample[8].push('T');
        sample[8].push('R');
        Scanner file = new Scanner(new File("resources/craneDirections.txt"));
        while (file.hasNext()) {
            String line = file.nextLine();
            String[] sliced = line.split(" ");


            Integer loopNum = Integer.parseInt(sliced[1]);
            Integer start = Integer.parseInt(sliced[3]);
            Integer end = Integer.parseInt(sliced[5]);
            improvedMoveBoxes(loopNum, start, end);
        }
        for (int i = 0; i < sample.length; i++) {
            sb.append(sample[i].pop());
        }
        String tops = sb.toString();
        System.out.println(tops);
    }

    private static void moveBoxes(Integer loopNum, Integer start, Integer end) {
        for (int i = 0; i < loopNum; i++) {
            sample[end-1].push(sample[start-1].pop());

        }
    }

    private static void improvedMoveBoxes(Integer qty, Integer start, Integer end){
        Stack<Character> craneStack = new Stack<>();
        for (int i = 0; i < qty; i++) {
            craneStack.push((Character) sample[start-1].pop());
        }

        for(Character c: craneStack) {
            sample[end-1].push(c);
        }
    }
}