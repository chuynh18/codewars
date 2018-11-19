def rgb(r, g, b):
   rgb = [r,g,b]

   for index, item in enumerate(rgb):
      if item < 0:
         rgb[index] = 0
      elif item > 255:
         rgb[index] = 255
   
   def dec_to_hex(input):
      # only works for inputs 0 to 255 inclusive
      def map_to_hex(num):
         mapper = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
      
         for index, item in enumerate(mapper):
            if int(num) == index:
               return item

      answer = list(divmod(input, 16))

      for index, item in enumerate(answer):
         answer[index] = map_to_hex(str(item))
      return answer[0] + answer[1]

   output = ""

   for item in rgb:
      output += (dec_to_hex(item))
      
   return output

print(rgb(260,-14,32))