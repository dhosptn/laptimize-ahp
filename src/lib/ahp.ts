export function calculateAHP(matrix: number[][]) {
  const n = matrix.length;
  const colSums = Array(n).fill(0);

  // Hitung total tiap kolom
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) colSums[j] += matrix[i][j];
  }

  // Normalisasi matriks
  const normalized = matrix.map((row) => row.map((v, j) => v / colSums[j]));

  // Hitung bobot (rata-rata tiap baris)
  const weights = normalized.map((row) => row.reduce((a, b) => a + b, 0) / n);

  // Hitung λmax
  const λmax =
    matrix
      .map(
        (row, i) => row.reduce((a, b, j) => a + b * weights[j], 0) / weights[i]
      )
      .reduce((a, b) => a + b, 0) / n;

  // Hitung Consistency Ratio (CR)
  const CI = (λmax - n) / (n - 1);
  const RI_TABLE: Record<number, number> = {
    1: 0.0,
    2: 0.0,
    3: 0.58,
    4: 0.9,
    5: 1.12,
    6: 1.24,
    7: 1.32,
    8: 1.41,
    9: 1.45,
    10: 1.49,
  };
  const RI = RI_TABLE[n] || 1.49;
  const CR = CI / RI;

  return { weights, CR, λmax, CI };
}
