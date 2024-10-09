export default {
    localStorageKey: "multiplicationTasks",
    generateTasksAndWeights(calculatedTasks) {
        let DEFAULT_WEIGHT = 100;
        let tasks = [];
        let taskWeights = []
        for (let multiplier = 1; multiplier <= 10; multiplier++) {
            for (let multiplicand = 1; multiplicand <= 10; multiplicand++) {
                let id = multiplier + "#" + multiplicand
                tasks.push({
                    "id": id,
                    "multiplier": multiplier,
                    "multiplicand": multiplicand,
                    "result": multiplier * multiplicand,
                    "formula": `${multiplier} · ${multiplicand}`,
                    "calculated": 0,
                    "wrong": 0,
                })

                let weight = DEFAULT_WEIGHT
                if (calculatedTasks != null && calculatedTasks[id] !== undefined) {
                    let task = calculatedTasks[id]
                    if (task.wrong > 0) {
                        weight = Number.parseInt(((task.wrong / task.calculated) * 100).toFixed(1));
                    }
                }
                taskWeights.push(weight)
            }
        }
        return {tasks, taskWeights}
    },
    sortTasks(tasks) {
        let sortedTasks = [];
        for (let key in tasks) {
            sortedTasks.push(tasks[key]);
        }
        sortedTasks.sort((a, b) => {
            if (a.multiplicand < b.multiplicand) return -1;
            if (a.multiplicand > b.multiplicand) return 1;

            if (a.multiplier < b.multiplier) return -1;
            if (a.multiplier > b.multiplier) return 1;
            return 0;
        });

        return sortedTasks;
    }
}
