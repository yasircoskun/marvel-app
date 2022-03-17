/**
 * The proptype_checker function checks for the existence and 
 * type of required props when a component is mounted. 
 * Reports undefined probes and incorrect type entries.
 * 
 * The prefix parameter is used to give meaningful error messages.
 * By default it takes the value of props.
 *
 * The Expected parameter must be an object that specifies the 
 * expected props and their types.
 * 
 * The Received parameter must be an object (react props is allready an object)
 * 
 * Usage Examples: 
 * const errors = proptype_checker({name: String, surname: String, skills{algorithm: String, level: Number}}, props)
 * if (errors.length !== 0) return(<>check console for errors</>)
 * 
 * ---
 * 
 * const person = {
 *  name: "Yasir",
 *  surname: "Coskun",
 *  skills: {
 *    algorithm: "leet",
 *    level: 1337
 *  }
 * }
 * const errors = proptype_checker({name: String, surname: String, skills{algorithm: String, level: Number}}, person, 'person')
 * // errors variable will be an empty array
 * 
 * @param {any} expected
 * @param {any} received
 * @param {any} prefix
 * @returns {any}
 */
export default function proptype_checker(expected, received, prefix){
  if(typeof prefix == "undefined"){
    prefix = "props";
  }
  let errors = []
  if(typeof received === "object"){
    let expected_keys = Object.keys(expected).sort()
    let i = 0; 
    while(i < expected_keys.length){
      let key = expected_keys[i];
      i += 1
      if(received.hasOwnProperty(key)){
        let expected_type = null
        if(typeof expected[key] === "function"){
          expected_type = typeof expected[key].call()
        }else{
          expected_type = typeof expected[key]
        }
        if(typeof received[key] === expected_type){
          if(typeof expected[key] === "object"){
            errors = [...errors, ...proptype_checker(expected[key], received[key], [prefix, key].join('.'))]
          }
        }else{
          errors.push(TypeError('"' + [prefix, key].join('.') + '" is not a ' + expected_type));
        }
      }else{
        errors.push(Error('"' + [prefix, key].join('.') + '" is undefined'));
      }
    }
  }else if(typeof received !== typeof expected){
    errors.push(Error('Expected and Reveived props must be object'))
  }
  if(errors.length !== 0)
    errors.forEach(error => {
      console.error(error.message)
    })
	return errors
}