export const cleanData = (data) => {
  return data.data.map(item => {
    return item.attributes;
  })
}