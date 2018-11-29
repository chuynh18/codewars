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
      int power = 0;

      for (int i = 0; i < intArr.length; i++) {
         power += (int) Math.pow(intArr[i], p+i);
      }

      if (power % n == 0) {
         return power / n;
      }

      return -1;
   }
	
}
