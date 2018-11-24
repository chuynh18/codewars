// https://www.codewars.com/kata/counting-duplicates/

package kata

import "strings"

func duplicate_count(s1 string) int {
	s1 = strings.ToLower(s1)
	var answer int = 0

	var stringsMap map[string]int = make(map[string]int)

	for _, val := range s1 {
		if stringsMap[string(val)] == 0 {
			stringsMap[string(val)] = 1
		} else {
			stringsMap[string(val)]++
		}
	}

	for i := range stringsMap {
		if (stringsMap[i]) > 1 {
			answer++
		}
	}

	return answer //Instead of returning '1', you have to return integer 'i' as answer of solution.  
}


