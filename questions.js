const questionBank = [
    // 1-5: Basic Concepts (ମୌଳିକ ଧାରଣା)
    {
        question: "aⁿ ରେ 'n' କଣ କୁହାଯାଏ?",
        options: ["ଭିତ୍ତି", "ସୂଚକ", "ମାନ", "ଗୁଣନ"],
        correct: 1,
        explanation: "aⁿ ରେ n ହେଉଛି ସୂଚକ (Exponent), a ହେଉଛି ଭିତ୍ତି (Base)"
    },
    {
        question: "2⁵ ର ମାନ କେତେ?",
        options: ["10", "16", "32", "64"],
        correct: 2,
        explanation: "2⁵ = 2×2×2×2×2 = 32"
    },
    {
        question: "3⁴ ର ମାନ କେତେ?",
        options: ["12", "27", "81", "64"],
        correct: 2,
        explanation: "3⁴ = 3×3×3×3 = 81"
    },
    {
        question: "10³ ର ମାନ କେତେ?",
        options: ["30", "100", "1000", "10000"],
        correct: 2,
        explanation: "10³ = 10×10×10 = 1000"
    },
    {
        question: "କୌଣସି ସଂଖ୍ୟାର ଘାତ 0 ହେଲେ ମାନ କେତେ? (a≠0)",
        options: ["0", "1", "a", "ଅସଂଜ୍ଞାୟିତ"],
        correct: 1,
        explanation: "a⁰ = 1 (a≠0), 5⁰=1, 100⁰=1"
    },

    // 6-10: Multiplication Law (ଗୁଣନ ନିୟମ)
    {
        question: "a^m × a^n = ?",
        options: ["a^(m+n)", "a^(m-n)", "a^(m×n)", "a^(m÷n)"],
        correct: 0,
        explanation: "ସୂଚକ ଗୁଣନ ନିୟମ: a^m × a^n = a^(m+n)"
    },
    {
        question: "2³ × 2⁴ = ?",
        options: ["2⁷", "2¹²", "4⁷", "2¹"],
        correct: 0,
        explanation: "2³ × 2⁴ = 2^(3+4) = 2⁷ = 128"
    },
    {
        question: "5² × 5³ × 5⁰ = ?",
        options: ["5⁵", "5⁰", "5⁶", "25"],
        correct: 0,
        explanation: "5²⁺³⁺⁰ = 5⁵ = 3125"
    },
    {
        question: "x⁴ × x⁻² = ?",
        options: ["x²", "x⁶", "x⁻⁸", "x⁸"],
        correct: 0,
        explanation: "x⁴⁺⁽⁻²⁾ = x²"
    },
    {
        question: "(-3)² × (-3)³ = ?",
        options: ["(-3)⁵", "9⁵", "(-3)⁶", "6⁵"],
        correct: 0,
        explanation: "(-3)² × (-3)³ = (-3)²⁺³ = (-3)⁵ = -243"
    },

    // 11-15: Division Law (ଭାଗ ନିୟମ)
    {
        question: "a^m ÷ a^n = ?",
        options: ["a^(m+n)", "a^(m-n)", "a^(m×n)", "a^(n-m)"],
        correct: 1,
        explanation: "ସୂଚକ ଭାଗ ନିୟମ: a^m ÷ a^n = a^(m-n)"
    },
    {
        question: "7⁸ ÷ 7³ = ?",
        options: ["7⁵", "7²⁴", "7¹¹", "7⁻⁵"],
        correct: 0,
        explanation: "7⁸⁻³ = 7⁵ = 16807"
    },
    {
        question: "2¹⁰ ÷ 2⁴ = ?",
        options: ["2⁶", "2¹⁴", "2⁴⁰", "2²·⁵"],
        correct: 0,
        explanation: "2¹⁰⁻⁴ = 2⁶ = 64"
    },
    {
        question: "x⁵ ÷ x⁵ = ?",
        options: ["0", "x", "1", "x¹⁰"],
        correct: 2,
        explanation: "x⁵⁻⁵ = x⁰ = 1"
    },
    {
        question: "3⁷ ÷ 3¹⁰ = ?",
        options: ["3⁻³", "3³", "3¹⁷", "-3³"],
        correct: 0,
        explanation: "3⁷⁻¹⁰ = 3⁻³ = 1/27"
    },

    // 16-20: Power of Power (ଘାତର ଘାତ)
    {
        question: "(a^m)^n = ?",
        options: ["a^(m+n)", "a^(m-n)", "a^(m×n)", "a^(m÷n)"],
        correct: 2,
        explanation: "(a^m)^n = a^(m×n), 3²=9, (3²)³=9³=729"
    },
    {
        question: "(2³)² = ?",
        options: ["2⁵", "2⁶", "2⁹", "8²"],
        correct: 1,
        explanation: "(2³)² = 2^(3×2) = 2⁶ = 64"
    },
    {
        question: "(5²)⁴ = ?",
        options: ["5⁶", "5⁸", "5²", "10⁴"],
        correct: 1,
        explanation: "(5²)⁴ = 5^(2×4) = 5⁸ = 390625"
    },
    {
        question: "(x⁴)³ = ?",
        options: ["x⁷", "x¹²", "x¹", "x⁶⁴"],
        correct: 1,
        explanation: "(x⁴)³ = x^(4×3) = x¹²"
    },
    {
        question: "[(2²)²]² = ?",
        options: ["2⁶", "2⁸", "2⁴", "2¹⁶"],
        correct: 1,
        explanation: "2^(2×2×2) = 2⁸ = 256"
    },

    // 21-25: Negative Exponents (ଋଣାତ୍ମକ ସୂଚକ)
    {
        question: "a⁻ⁿ = ?",
        options: ["-aⁿ", "1/aⁿ", "aⁿ", "0"],
        correct: 1,
        explanation: "a⁻ⁿ = 1/aⁿ, 2⁻³ = 1/8"
    },
    {
        question: "4⁻² = ?",
        options: ["-16", "1/16", "-8", "16"],
        correct: 1,
        explanation: "4⁻² = 1/4² = 1/16"
    },
    {
        question: "(1/3)⁻² = ?",
        options: ["1/9", "9", "-9", "-1/9"],
        correct: 1,
        explanation: "(1/3)⁻² = (3/1)² = 3² = 9"
    },
    {
        question: "10⁻³ = ?",
        options: ["-1000", "0.001", "1000", "-0.001"],
        correct: 1,
        explanation: "10⁻³ = 1/10³ = 1/1000 = 0.001"
    },
    {
        question: "2⁻² + 3⁻¹ = ?",
        options: ["5⁻³", "1/12", "7/12", "5/6"],
        correct: 2,
        explanation: "2⁻²=1/4, 3⁻¹=1/3, 1/4+1/3=(3+4)/12=7/12"
    },

    // 26-30: Standard Form & Mixed (ମାନକ ରୂପ ଓ ମିଶ୍ରିତ)
    {
        question: "0.00001 କୁ ମାନକ ରୂପରେ ଲେଖିଲେ?",
        options: ["1×10⁻⁴", "1×10⁻⁵", "1×10⁵", "10×10⁻⁶"],
        correct: 1,
        explanation: "0.00001 = 1/100000 = 1×10⁻⁵"
    },
    {
        question: "5000000 କୁ ମାନକ ରୂପରେ ଲେଖିଲେ?",
        options: ["5×10⁶", "5×10⁵", "50×10⁵", "5×10⁷"],
        correct: 0,
        explanation: "5000000 = 5×1000000 = 5×10⁶"
    },
    {
        question: "3² × 3⁴ ÷ 3³ = ?",
        options: ["3³", "3²", "3⁶", "3¹"],
        correct: 0,
        explanation: "3²⁺⁴⁻³ = 3³ = 27"
    },
    {
        question: "(2³ × 3²) = ?",
        options: ["72", "36", "54", "48"],
        correct: 0,
        explanation: "2³=8, 3²=9, 8×9=72"
    },
    {
        question: "ଯଦି 2^x = 16 ହୁଏ, ତେବେ x = ?",
        options: ["2", "4", "8", "3"],
        correct: 1,
        explanation: "2⁴ = 16, ତେଣୁ x = 4"
    }
];

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questionBank;
}
