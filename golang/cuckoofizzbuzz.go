// https://www.codewars.com/kata/58485a43d750d23bad0000e6

package kata

import "strings"
import "strconv"

func cuckoo(repetitions int) string {
  var output string = strings.Repeat("Cuckoo ", repetitions - 1)
  
  output += "Cuckoo"
 
  return output
}

func FizzBuzzCuckooClock(time string) string {
  splitTime := strings.Split(time, ":")
  minutes, _ := strconv.Atoi(splitTime[1])
  hours, _ := strconv.Atoi(splitTime[0])
  hours = hours % 12

    if splitTime[1] == "00" {
      if hours == 0 {
        return cuckoo(12);
      } else {
        return cuckoo(hours)
      }
      
    } else if splitTime[1] == "30" {
      return "Cuckoo"
    } else if (minutes % 3 == 0 && minutes % 5 == 0) {
      return "Fizz Buzz"
    } else if minutes % 3 == 0 {
      return "Fizz"
    } else if minutes % 5 == 0 {
      return "Buzz"
    } else {
      return "tick"
    }
}