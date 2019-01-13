// this is horrible and I will clean it up someday

import java.util.*;

public class Greed{

   public static int greedy(int[] dice){
      System.out.println(Arrays.toString(dice));
         
      int score = 0;
      HashMap<Integer, Integer> hashMap = new HashMap<Integer, Integer>();

      for (int i = 0; i < dice.length; i++) {
         if (!hashMap.containsKey(dice[i])) {
            hashMap.put(dice[i], 1);
         } else {
            hashMap.replace(dice[i], hashMap.get(dice[i]) + 1);
         }
      }


      while (!hashMap.isEmpty()) {
         System.out.println(hashMap);

         if (hashMap.containsKey(1)) {
            if (hashMap.get(1) >= 3) {
               System.out.println("Adding 1000 to score.");
               score += 1000;
               hashMap.replace(1, hashMap.get(1), hashMap.get(1) - 3);
            }
         }
         
         if (hashMap.containsKey(6)) {
            if (hashMap.get(6) >= 3) {
               System.out.println("Adding 600 to score.");
               score += 600;
               hashMap.replace(6, hashMap.get(6), hashMap.get(6) - 3);
            }
         }
         
         if (hashMap.containsKey(5)) {
            if (hashMap.get(5) >= 3) {
               System.out.println("Adding 500 to score.");
               score += 500;
               hashMap.replace(5, hashMap.get(5), hashMap.get(5) - 3);
            }
         }
         
         if (hashMap.containsKey(4)) {
            if (hashMap.get(4) >= 3) {
               System.out.println("Adding 400 to score.");
               score += 400;
               hashMap.replace(4, hashMap.get(4), hashMap.get(4) - 3);
            }
         }
         
         if (hashMap.containsKey(3)) {
            if (hashMap.get(3) >= 3) {
               System.out.println("Adding 300 to score.");
               score += 300;
               hashMap.replace(3, hashMap.get(3), hashMap.get(3) - 3);
            }
         }
         
         if (hashMap.containsKey(2)) {
            if (hashMap.get(2) >= 3) {
               System.out.println("Adding 200 to score.");
               score += 200;
               hashMap.replace(2, hashMap.get(2), hashMap.get(2) - 3);
            }
         }
         
         if (hashMap.containsKey(1)) {
            if (hashMap.get(1) >= 1) {
               System.out.println("Adding 100 to score.");
               score += 100;
               hashMap.replace(1, hashMap.get(1), hashMap.get(1) - 1);
            }
         }
         
         if (hashMap.containsKey(5)) {
            if (hashMap.get(5) >= 1) {
               System.out.println("Adding 50 to score.");
               score += 50;
               hashMap.replace(5, hashMap.get(5), hashMap.get(5) - 1);
            }
         }

         if (hashMap.containsKey(2)) {
            if (hashMap.get(2) <= 2) {
               hashMap.remove(2);
            }
         }

         if (hashMap.containsKey(3)) {
            if (hashMap.get(3) <= 2) {
               hashMap.remove(3);
            }
         }

         if (hashMap.containsKey(4)) {
            if (hashMap.get(4) <= 2) {
               hashMap.remove(4);
            }
         }

         if (hashMap.containsKey(6)) {
            if (hashMap.get(6) <= 2) {
               hashMap.remove(6);
            }
         }
   
         for (int i = 1; i < 7; i++) {
            if (hashMap.containsKey(i)) {
               if (hashMap.get(i) == 0) {
                  hashMap.remove(i);
               }
            }
         }

         System.out.println(score);
      }

      return score;
   }
}