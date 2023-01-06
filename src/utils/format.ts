export const numberWithCommas = (x: number) => {
  const nf = new Intl.NumberFormat('en-US')
  return nf.format(x)
}