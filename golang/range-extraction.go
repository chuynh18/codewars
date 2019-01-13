// https://www.codewars.com/kata/range-extraction/ - 4 kyu

package kata

import (
	"strings"
	"strconv"
)

func Solution(list []int) string {
	var newList []string

	for i := 0; i < len(list); i++ {
		var count int
		for j := i; j < len(list); j++ {
			if j < len(list) - 1 && list[j] + 1 == list[j + 1] {
				count++
			} else {
				if count == 0 {
					newList = append(newList, strconv.Itoa(list[i]))
				} else if count == 1 {
					newList = append(newList, strconv.Itoa(list[i]), strconv.Itoa(list[i+1]))
					i += count
				} else {
					concat := strconv.Itoa(list[i]) + "-" + strconv.Itoa(list[i+count])
					newList = append(newList, concat)
					i += count
				}
				break;
			}
		}
	}

  	return strings.Join(newList, ",")
}