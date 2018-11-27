// https://www.codewars.com/kata/range-extraction/ - 4 kyu

class Solution {
   public static String rangeExtraction(int[] arr) {
      StringBuilder answer = new StringBuilder(1024);

      for (int i = 0; i < arr.length; i++) {
         int count = 0;
         for (int j = i; j < arr.length; j++) {
            if (j < arr.length - 1 && arr[j] + 1 == arr[j + 1]) {
               count++;
            } else {
               if (count == 0) {
                  answer.append(arr[i]).append(',');
               } else if (count == 1) {
                  answer.append(arr[i]).append(',').append(arr[i + 1]).append(',');
                  i++;
               } else {
                  answer.append(arr[i]).append('-').append(arr[i + count]).append(',');
                  i += count;
               }
               break;
            }
         }
      }
      
      answer.deleteCharAt(answer.length()-1);
      return answer.toString();
   }
}