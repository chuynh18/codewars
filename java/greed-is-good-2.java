// less ugly than original solution (not a compliment)

import java.util.Map;
import java.util.HashMap;

public class Greed{

   static Integer score = 0;

   static private void scoreGame(Integer diceValue, Integer numRolls, Integer scoreIncrement, Map<Integer, Integer> map) {
      if (map.containsKey(diceValue)) {
         if (map.get(diceValue) >= numRolls) {
            score += scoreIncrement;
            map.replace(diceValue, map.get(diceValue), map.get(diceValue) - numRolls);
         }
      }
   }

   static public int greedy(int[] dice){
      Map<Integer, Integer> hashMap = new HashMap<Integer, Integer>();

      for (int i = 0; i < dice.length; i++) {
         if (!hashMap.containsKey(dice[i])) {
            hashMap.put(dice[i], 1);
         } else {
            hashMap.replace(dice[i], hashMap.get(dice[i]) + 1);
         }
      }

      score = 0;
      scoreGame(1, 3, 1000, hashMap);
      for (int i = 2; i <= 6; i++) {
         scoreGame(i, 3, i*100, hashMap);
      }
      for (int i = 2; i >= 1; i--) {
         scoreGame(1, i, 100*i, hashMap);
         scoreGame(5, i, 50*i, hashMap);
      }

      return score;
   }
}