const defaultPickFromOld = (oldList, index) => oldList[index]
const defaultPickFromNew = (newList, index) => newList[index]

const mergeFromOld = ({
  oldList,
  newList,
  combinedList = [],
  afterIndex = 0,
  pickFromOld = defaultPickFromOld,
}) => {
  let afterOffset = 0
  while (
    afterIndex + afterOffset < oldList.length &&
    !newList.includes(oldList[afterIndex + afterOffset])
  ) {
    const oldElem = pickFromOld(oldList, afterIndex + afterOffset)
    combinedList.push(oldElem)
    afterOffset++
  }
  return combinedList
}

export const combineLists = ({
  oldList,
  newList,
  pickFromNew = defaultPickFromNew,
  pickFromOld = defaultPickFromOld,
}) => {
  // first, pull in any deleted items that are at the start.
  let combinedList = mergeFromOld({ oldList, newList })

  // now, peel off the new elements one by one
  // for (const newElem of newList) {
  for (let i = 0; i < newList.length; i++) {
    const newElem = pickFromNew(newList, i)
    combinedList.push(newElem)
    // find it in the old list
    const oldIndex = oldList.findIndex((e) => e === newElem)
    if (oldIndex >= 0) {
      // and pull in any deleted items following it, if necessary
      combinedList = mergeFromOld({
        oldList,
        newList,
        combinedList,
        afterIndex: oldIndex + 1,
        pickFromOld,
      })
    }
  }

  // then return our combined list.
  return combinedList
}
