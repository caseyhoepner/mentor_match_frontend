export const cleanData = (data) => {
  return data.data.map(item => {
    return item.attributes;
  })
}

export const cleanRelationshipData = (relationships) => {
  return relationships.data.map(relationship => {
    return relationship;
  })
}