package kata

import "strings"
import "strconv"
import "sort"

type numWeight struct {
	value string
	weight int
}

// OrderWeight takes in a string of ints and returns that string of numbers reordered by some arbitrary metric
func OrderWeight(str string) string {

	var splitStr = strings.Split(str, " ")
	var listOfWeights []numWeight
	var ansList []string

	for i, v := range splitStr {
		splitStr[i] = strings.Trim(v, " ")
		listOfWeights = append(listOfWeights, numWeight{v, calcWeight(v)})
	}

	sort.Slice(listOfWeights, func(i, j int) bool {
		if listOfWeights[i].weight < listOfWeights[j].weight {
			return true
		}

		if listOfWeights[i].weight > listOfWeights[j].weight {
			return false
		}

		return listOfWeights[i].value < listOfWeights[j].value
	})

	for _, v := range listOfWeights {
		ansList = append(ansList, v.value)
	}

	return strings.Join(ansList, " ")
}

func calcWeight(str string) int {
	var splitStr = strings.Split(str, "")
	ans := 0

	for _, v := range splitStr {
		converted, _ := strconv.Atoi(v)
		ans += converted
	}

	return ans
}