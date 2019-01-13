public class DigPow {

   private static int[] convertToArr(int n) {
      final String[] stringArr = Integer.toString(n).split("");
      final int[] intArr = new int[stringArr.length];

      for (int i = 0; i < stringArr.length; i++) {
         intArr[i] = Integer.parseInt(stringArr[i]);
      }

      return intArr;
   }

   public static long digPow(int n, int p) {
      final int[] intArr = convertToArr(n);
      int powerSum = 0;

      for (int i = 0; i < intArr.length; i++) {
         powerSum += (int) Math.pow(intArr[i], p+i);
      }

      if (powerSum % n == 0) {
         return powerSum / n;
      }

      return -1;
   }
	
}
