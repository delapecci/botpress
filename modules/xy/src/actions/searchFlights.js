const axios = require('axios')
// const EventSource = require('eventsource')
const Promise = require('bluebird')

/**
 * @title Search flights with natural query conditions
 * @category XY
 * @param {string} dateDesc Natural date description e.g. 后天、下周三
 * @param {string} timeDesc Natural time description e.g. 早上7点前、上午10点左右
 * @param {string} departAirportCode Departure airport code e.g. SHA
 * @param {string} arrivalAirportCode Arrival airport code e.g. SHA
 * @param {string} output Output value key
 * @author Chris Li
 */
const searchFlights = async (dateDesc, timeDesc, departAirportCode, arrivalAirportCode, output) => {
  // Get module config
  const config = await bp.config.getModuleConfig('xy')
  let searchApi = config.skillServerApi.searchFlights

  // TODO: use SSE
  // 1<->N SSE pipeline, each conversition has a event key [botId.uid.XXXX]
  const eventKey = `${event.botId}.${event.target}.searchFlights`
  // let sseListener = new Promise((resolve, reject) => {
  //   const es = new EventSource(config.skillServerApi.sse)
  //   es.onerror(err => reject(err.message))
  //   es.addEventListener(eventKey, function (e) {
  //     resolve(e.data)
  //   })
  // })

  // bp.logger.info(event.target)

  try {
    let { data } = await axios.post(searchApi, {
      date_description: dateDesc,
      time_description: timeDesc,
      depart_code:  departAirportCode,
      arrival_code: arrivalAirportCode,
      eventKey
    })
    temp[output] = data
  } catch (e) {
    temp[output] = ''
  }
}

return searchFlights(args.dateDesc, args.timeDesc, args.departAirportCode, args.arrivalAirportCode, args.output)
