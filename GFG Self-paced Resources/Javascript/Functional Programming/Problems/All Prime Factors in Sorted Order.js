// ============================================================
//  All Prime Factors in Sorted Order
//  Print the prime factorization of n in non-decreasing order.
//  Constraint: 2 <= n <= 200
// ============================================================
//
//  LOGIC (clear, step by step):
//  - Start dividing n by the smallest number i (begin at 2).
//  - While i divides n perfectly, i is a prime factor -> record it
//    and divide it out of n. Repeat until it no longer divides.
//  - Only then move to the next i. Because i only increases and each
//    factor is fully removed first, the output comes out already sorted.
//  - Loop while i*i <= n (only need to check up to sqrt(n)). Any value
//    left with n > 1 at the end is itself a prime factor.
//
//  Trace for n = 100:
//    i=2 -> push 2, n=50 -> push 2, n=25 (2 no longer divides)
//    i=3,4 skip ; i=5 -> push 5, n=5 -> push 5, n=1  => "2 2 5 5"
//
//  Time complexity: O(sqrt(n))
// ============================================================
//
//  ------------------------------------------------------------
//  DEEP DIVE: the 3 confusing parts explained
//  ------------------------------------------------------------
//
//  (1) WHY  i * i <= n  ?
//      It is just a fast way of writing  i <= sqrt(n).
//      A number has AT MOST ONE prime factor bigger than its
//      square root, so we never need to check past sqrt(n).
//
//      n = 36, sqrt(36) = 6
//        i | i*i | i*i <= 36 ?
//        2 |  4  | yes
//        3 |  9  | yes
//        4 | 16  | yes
//        5 | 25  | yes
//        6 | 36  | yes
//        7 | 49  | no  -> STOP (no need to check 7..36)
//
//  (2) WHY  n = n / i  ?
//      Every time i is a factor, we REMOVE it by dividing, so n
//      shrinks and the same factor is counted correctly.
//
//      n = 12
//        step | i | n before | n%i==0 | action          | n after
//          1  | 2 |    12     |  yes   | push 2, divide  |   6
//          2  | 2 |     6     |  yes   | push 2, divide  |   3
//          3  | 2 |     3     |  no    | next i          |   3
//          4  | 3 |     3     |  yes   | push 3, divide  |   1
//      => 2 2 3   (12 = 2 * 2 * 3)
//      If we never divided, n would stay 12 and loop forever.
//
//  (3) WHY  if (n > 1)  at the end ?
//      The loop stops at sqrt(n), so one big prime can still be
//      left inside n. We must add that leftover.
//
//      n = 14, sqrt(14) ~ 3.7
//        i | i*i<=14 | n%i==0 | action         | n now
//        2 |  yes    |  yes   | push 2, divide |   7
//        3 |  no     |   -    | loop STOPS     |   7
//      Loop ended but n = 7 is still a prime -> if(n>1) adds 7
//      => 2 7   (14 = 2 * 7)
//
//        case          | n after loop | if(n>1) adds?
//        n = 14        |      7       | yes -> add 7
//        n = 13 (prime)|     13       | yes -> add 13
//        n = 12        |      1       | no  -> nothing left
// ============================================================


// ---------------- JavaScript version ----------------
function printPrimeFactorization(n) {
    const factors = [];                  // array to collect prime factors

    for (let i = 2; i * i <= n; i++) {   // try factors up to sqrt(n)
        while (n % i === 0) {            // while i divides n perfectly
            factors.push(i);             // record this prime factor
            n = n / i;                   // remove factor i from n
        }
    }

    if (n > 1) {                         // leftover is itself a prime
        factors.push(n);
    }

    console.log(factors.join(" "));      // e.g. "2 2 5 5"
    return factors;
}

// Examples
printPrimeFactorization(100); // 2 2 5 5
printPrimeFactorization(27);  // 3 3 3


/* ---------------- Java version (for the GFG editor) ----------------
   NOTE: This is kept as a comment because this file is .js.
   Paste the code below into the GFG editor when it is set to Java.

class Solution {
    public static void printPrimeFactorization(int n) {
        StringBuilder sb = new StringBuilder();   // build the output

        for (int i = 2; i * i <= n; i++) {        // try factors up to sqrt(n)
            while (n % i == 0) {                  // == in Java, NOT ===
                sb.append(i).append(" ");         // record this prime factor
                n = n / i;                        // remove factor i from n
            }
        }

        if (n > 1) {                              // leftover is itself a prime
            sb.append(n);
        }

        System.out.println(sb.toString().trim()); // e.g. "2 2 5 5"
    }
}
------------------------------------------------------------------- */
