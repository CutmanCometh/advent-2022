import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Rps {
    public static void main(String[] args) throws FileNotFoundException {
        Scanner file = new Scanner(new File("resources/rockPaperScissors.txt"));

        int totalScore = 0;
        while (file.hasNext()) {
            int currentScore = 0;
            String line = file.nextLine();
            String[] game = line.split(" ");
            Character opponent = game[0].charAt(0);
            Character outcome = game[1].charAt(0);

            // opp rock
            if (opponent.equals('A')){
                if (outcome.equals('X')){// lose scissors
                    currentScore += 3;
                    currentScore += 0;
                } else if (outcome.equals('Y')){ //draw rock
                    currentScore += 1;
                    currentScore += 3;
                } else {//win paper
                    currentScore += 2;
                    currentScore += 6;
                }

                // opp paper
            } else if(opponent.equals('B')){
                if (outcome.equals('X')){// lose rock
                    currentScore += 1;
                    currentScore += 0;
                } else if (outcome.equals('Y')){ //draw paper
                    currentScore += 2;
                    currentScore += 3;
                } else {//win scissors
                    currentScore += 3;
                    currentScore += 6;
                }

                // opp scissors
            } else {
                if (outcome.equals('X')){// lose paper
                    currentScore += 2;
                    currentScore += 0;
                } else if (outcome.equals('Y')){ //draw scissors
                    currentScore += 3;
                    currentScore += 3;
                } else {//win rock
                    currentScore += 1;
                    currentScore += 6;
                }
            }
            totalScore += currentScore;
        }
        file.close();
        System.out.println("totalScore: " + totalScore);

    }
}