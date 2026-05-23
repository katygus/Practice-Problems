// ============================================================
// PAIR SUM COUNT
// Difficulty: Easy / Medium
// Pattern: Hash Map / Frequency Map
// ============================================================
//
// Given an array of integers and a target value, return the
// number of unique pairs (i, j) where i < j and
// nums[i] + nums[j] === target.
//
// A "unique pair" means you cannot reuse the same index twice,
// but identical values at different indices are allowed.
//
// Examples:
//   countPairs([1, 2, 3, 4, 3], 6)  => 2
//     Pairs: (2,4) and (3,3)
//
//   countPairs([1, 1, 1, 1], 2)     => 6
//     All combinations of two 1s: C(4,2) = 6
//
//   countPairs([5, 5, 5], 10)       => 3
//     (5@0,5@1), (5@0,5@2), (5@1,5@2)
//
//   countPairs([1, 2, 3], 10)       => 0
//     No valid pairs
//
// Constraints:
//   - 2 <= nums.length <= 100,000
//   - -10,000 <= nums[i] <= 10,000
//   - -20,000 <= target <= 20,000
// ============================================================

//works, but very bad time/space complexity

//NEXT TRY
function countPairs(nums, target) {
  // create freq map for each val
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }
  // init count var
  let count = 0;
  // create new set to track seen vals
  const seen = new Set();
  // iter over val and freq of freqMap
  for (const [val, freq] of freqMap) {
    // if seenSet has that value, skip it bc it's been used
    if (seen.has(val)) continue;
    // init var comparison -> target-value
    let comp = target - val;
    // if seenSet has comparison, skip it also
    if (seen.has(comp)) continue;
    // if the value is = to the comp, increase the count by the freq times the (freq minus 1) then divide it by 2 (this ensures it won't count the same combination more than once)
    if (val === comp) {
      count += (freq * (freq - 1)) / 2;
      // if the comp != the val, inc the count by the freq * the freq of the comp number
        // check to make sure the freqMap has the compliment
    } else if (val !== comp && freqMap.has(comp)) {
      count += freq * freqMap.get(comp);
    }
    // then check if seen has the value
    // if yes, continue in the loop(ignore it)
    if (seen.has(val)) continue;
      // if no, add the value and the comp to seen
      else {
        seen.add(val);
        seen.add(comp);
      }

  }
  return count;
}

// function countPairs(nums, target) {
//   let count = 0;
//   // map for the diff value needed to sum to target
//   const comparison = new Map();
//   // map for idx of each el
//   const idx = new Map();

//   for (let i = 0; i < nums.length; i++) {
//     let curr = nums[i];
//     let diff = target - curr;

//     // hashmap with key as els of nums and val as diff between target and that key
//     comparison.set(curr, comparison.get(curr) || diff);

//     // hashmap with key as index and val as el at that index
//     idx.set(i, idx.get(i) || nums[i]);

//     // if diff is a key in comparison, find its index
//     if (!comparison.has(curr)) continue;
//     else {
//       let found = comparison.get(curr);
//       for (let [key, value] of idx.entries()) {
//         if (value === found && key !== i) {
//           count++;
//         }
//       }
//     }
//   }

  // for (let [key, value] of idx.entries()) {
  //   console.log('key is: ', key);
  //   console.log('value is: ', value);

  //   if (comparison.has(value)) {
  //    let found = comparison.get(value);
  //    console.log('found is: ', found);

  //    console.log(idx.get(found))
  //    if (idx.get(found) !== key) {
  //     count++;
  //     console.log('count is: ', count)
  //    }
  //   }
  // }

//   console.log("comparison: ", comparison);
//   console.log("idx: ", idx);
//   return count;
// }

console.log(countPairs([1, 2, 3, 4, 3], 6));
// ============================================================
// TEST RUNNER — do not edit below this line
// ============================================================

let passed = 0;
let failed = 0;

function test(description, nums, target, expected) {
  const result = countPairs(nums, target);
  const pass = result === expected;
  if (pass) {
    console.log(`  ✅ PASS — ${description}`);
    passed++;
  } else {
    console.log(`  ❌ FAIL — ${description}`);
    console.log(`       nums:     [${nums.join(", ")}]`);
    console.log(`       target:   ${target}`);
    console.log(`       Expected: ${expected}`);
    console.log(`       Got:      ${result}`);
    failed++;
  }
}

console.log("\n🔢 Pair Sum Count Tests\n");

test("Two distinct pairs", [1, 2, 3, 4, 3], 6, 2);
test("Four identical values", [1, 1, 1, 1], 2, 6);
test("Three identical values", [5, 5, 5], 10, 3);
test("No valid pairs", [1, 2, 3], 10, 0);
test("Negative numbers", [-1, -2, 3, 4, -3], 1, 2);
test("Target zero with negatives", [-3, 3, -2, 2, 0, 0], 0, 3);
test("Single pair only", [1, 9, 2, 8], 10, 2);
test("All elements the same, no pair", [3, 3, 3], 7, 0);
test("Large array, one valid pair", [1, 2, 4, 5, 6], 3, 1);
test("Mixed signs, target negative", [-5, -5, 2, 3], -10, 1);
test("Two elements, valid pair", [4, 6], 10, 1);
test("Two elements, invalid pair", [4, 6], 9, 0);

console.log(`\n${passed} passed, ${failed} failed\n`);
