function towerBuilder(nFloors) {
   var answer = [];
   var paddingCounter = nFloors - 1;
   var spaces = " ".repeat(paddingCounter);
   var asterisks = "*".repeat(2 * nFloors + 1);

   for (var i = 0; i < nFloors; i++) {
      var padding = spaces.slice(0, paddingCounter--);
      answer[i] = padding + asterisks.slice(0, 2 * i + 1) + padding;
   }

   return answer;
}