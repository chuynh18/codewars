def make_looper(text):
   counter = -1

   def return_one():
      nonlocal counter
      counter += 1

      if counter == len(text):
         counter = 0
      
      return text[counter]
   
   return return_one

test = make_looper("CSGO")

print(test())
print(test())
print(test())
print(test())
print(test())
print(test())