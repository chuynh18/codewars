// https://www.codewars.com/kata/complementary-dna

package kata

import "bytes"

func DNAStrand(dna string) string {
  var buffer bytes.Buffer
  
  for _, val := range dna {
    if string(val) == "A" {
      buffer.WriteString("T")  
    } else if string(val) == "T" {
      buffer.WriteString("A")
    } else if string(val) == "C" {
      buffer.WriteString("G")
    } else {
      buffer.WriteString("C")
    }
  }
  
  return buffer.String()
}