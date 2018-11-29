import java.util.*;

public class SpinWords {
   private boolean longerThanChars(int lengthLimit, String word) {
      if (word.length() > lengthLimit) {
         return true;
      } else {
         return false;
      }
   }

   private String reverse(String word) {
      return new StringBuilder(word).reverse().toString();
   }

   public String spinWords(String sentence) {
      final String[] sentenceArr = sentence.split(" ", 0);

      for (int i = 0; i < sentenceArr.length; i++) {
         if (longerThanChars(4, sentenceArr[i])) {
            sentenceArr[i] = reverse(sentenceArr[i]);
         }
      }

      return String.join(" ", sentenceArr);
   }
}