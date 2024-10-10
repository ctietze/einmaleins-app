export default {
    /**
     * Selects a random value from an array based on the provided weights.
     *
     * @param {Array} values - The array of values to select from.
     * @param {Array} weights - The array of weights corresponding to the values.
     * @returns {*} The randomly selected value.
     * @throws Will throw an error if no value is found.
     */
    randomByWeight(values, weights) {
        let total = 0

        weights.forEach((weight) => {
            total += weight
        })

        const random = Math.ceil(Math.random() * total)

        let cursor = 0
        let randomValue = null
        for (let i = 0; i < weights.length; i++) {
            cursor += weights[i]
            if (cursor >= random) {
                randomValue = values[i]
                break
            }
        }
        if (randomValue === null) {
            throw "no value found";
        }

        return randomValue
    },

    /**
     * Selects a specified number of random values from an array based on the provided weights.
     *
     * @param {Array} values - The array of values to select from.
     * @param {Array} weights - The array of weights corresponding to the values.
     * @param {number} amount - The number of values to select.
     * @returns {Array} The array of randomly selected values.
     */
    selectRandomValues(values, weights, amount) {
        let selectedValues = []
        for (let i = 0; i < amount; i++) {
            let random = this.randomByWeight(values, weights)
            let index = values.indexOf(random);
            values = values.toSpliced(index, 1)
            weights = weights.toSpliced(index, 1)
            selectedValues.push(random)
        }
        console.log(selectedValues)
        return selectedValues
    },
}
