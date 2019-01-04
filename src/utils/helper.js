export const cleanData = (data) => {
  return data.data.map(item => {
    return item.attributes;
  })
}

export const cleanRelationshipData = (relationships) => {
  return relationships.data.filter(relationship => {
    return relationship.attributes.active;
  })
}