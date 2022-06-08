const axios = require('axios')

/**
 * @title Get airports of city
 * @category XY
 * @param {string} city City name
 * @param {string} output Output key name
 * @author Chris Li
 */
const lookupAirports = async (city, output) => {
  // Get module config
  const config = await bp.config.getModuleConfig('xy')
  // let api = `http://localhost:3004/base_cities?city=${encodeURIComponent(city)}`

  const { data } = await axios.get(`${config.airportsApi}`, {
    params: {
      city
    }
  })
  // bp.logger.info(event.target)

  let airports = data.map(airport => ({
    title: airport.name == '' ? city : airport.name,
    value: airport.code
  }))
  // bp.logger.debug(airports)

  temp[output] = airports
}

return lookupAirports(args.city, args.output)
