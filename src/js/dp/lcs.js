function lcs(s1, s2) {
  // 转换为数组方便处理
  const a1 = s1.split('');
  const a2 = s2.split('');
  // 搞个二维数组作为记录，a1 是行，a2 是列
  const memo = a1.map(l1 => {
    return a2.map(l2 => 0);
  })
  a1.forEach((l1, i1) => {
    a2.forEach((l2, i2) => {
      if (i1 === 0 && i2 === 0) {
        // 如果是第一行,第一列
        if (l1 === l2) {
          memo[0][0] = 1;
        }
      } else if (i1 === 0) {
        // 如果是第一行
        if (l1 === l2) {
          memo[0][i2] = memo[0][i2 -1] + 1;
        } else {
          memo[0][i2] = memo[0][i2 -1];
        }
      } else if (i2 === 0) {
        // 如果是第一列
        if (l1 === l2) {
          memo[i1][0] = memo[i1 - 1][0] + 1;
        } else {
          memo[i1][0] = memo[i1 - 1][0];
        }
      } else {
        if (l1 === l2) {
          memo[i1][i2] = memo[i1 - 1][i2 - 1] + 1;
        } else {
          memo[i1][i2] = Math.max(memo[i1-1][i2], memo[i1][i2 - 1]);
        }
      }
    });
  });

  // 找出 memo 中的最大值
  const result = memo.reduce((max, array) => {
    const maybeMax = Math.max.apply(null, array);
    return maybeMax > max ? maybeMax : max;
  }, 0)

  return result;
}
