package kata

// FindUniq takes in []float32 and returns the unique member
func FindUniq(arr []float32) float32 {
	var numMap = make(map[float32]int)

	for _, v := range arr {
		numMap[v]++
	}

	for k, v := range numMap {
		if v == 1 {
			return k
		}
	}

  	return arr[0]
}