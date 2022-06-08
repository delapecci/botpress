/**
 * @title Make message of single-choice content from data
 * @category XY
 * @param {string} type Pick between: user, session, temp, bot
 * @param {string} name The name of the variable
 * @param {string} titleKey Title key name of single-choice
 * @param {string} valueKey Value key name of single-choice
 * @param {string} text Optional message text
 * @author Chris Li
 */
const makeSingleChoice = async (type, name, titleKey, valueKey, text) => {
  let data = event.state[type][name]
  let choices_data = []
  for (let i = 0; i < data.length; i++) {
    choices_data.push({
      title: data[i][titleKey] || `Title${i + 1}`,
      value: data[i][valueKey] || `${i + 1}`
    })
  }
  // bp.logger.debug(airports)

  let options = {
    type: 'single-choice',
    text,
    choices: choices_data
  }

  // Send the message to the user (note the array, since you can send multiple payloads in the same reply)
  await bp.events.replyToEvent(event, [options])
}

// Actions are async, so make sure to return a promise
return makeSingleChoice(args.type, args.name, args.titleKey, args.valueKey, args.text)
