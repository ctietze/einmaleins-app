<script setup>
const vFocus = {
  mounted: (el) => {
    el.focus()
    el.classList.add("focused")
  }
}
</script>

<script>
import TaskProgressbar from "@/components/TaskProgressbar.vue";
import TaskResult from "@/components/TaskResult.vue";
import RandomSelection from '@/shared/lib/random-selection.js';
import LocalStorageAdapter from '@/shared/lib/local-storage-adapter.js';

const INITIATED = "INITIATED"
const IN_PROGRESS = "IN_PROGRESS"
const REVIEW_RESULT = "REVIEW_RESULT"
const FINISHED = "FINISHED"

export default {
  components: {
    TaskProgressbar,
    TaskResult
  },
  data: () => ({
    DEFAULT_WEIGHT: 1,
    INITIATED: INITIATED,
    IN_PROGRESS: IN_PROGRESS,
    REVIEW_RESULT: REVIEW_RESULT,
    FINISHED: FINISHED,
    status: INITIATED,
    calculatedTasks: {},
    tasks: [],
    taskWeights: [],
    selectedTasks: [],
    currentTest: null,
    currentTask: null,
    currentAnswer: null,
    currentRound: {
      "amount": 0,
      "correct": 0
    }
  }),
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.status = this.INITIATED
      this.calculatedTasks = LocalStorageAdapter.getItem("calculatedTasks")
    },
    calculateWeight() {
      this.tasks = []
      this.taskWeights = []
      for (let multiplier = 1; multiplier <= 10; multiplier++) {
        for (let multiplicand = 1; multiplicand <= 10; multiplicand++) {
          let id = multiplier + "#" + multiplicand
          this.tasks.push({
            "id": id,
            "multiplier": multiplier,
            "multiplicand": multiplicand,
            "result": multiplier * multiplicand,
            "calculated": 0,
            "wrong": 0,
          })
          let weight = this.DEFAULT_WEIGHT
          if (this.calculatedTasks != null && this.calculatedTasks[id] !== undefined) {
            let task = this.calculatedTasks[id]
            if (task.wrong > 0) {
              weight = Number.parseInt(((task.wrong / task.calculated) * 100).toFixed(1));
            }
          }
          this.taskWeights.push(weight)
        }
      }
    },
    start(amount) {
      this.calculateWeight()
      this.currentRound.amount = amount
      this.selectedTasks = RandomSelection.selectRandomValues(this.tasks, this.taskWeights, amount)
      this.nextTask()
    },
    nextTask() {
      this.currentAnswer = null
      if (this.selectedTasks.length === 0) {
        this.status = this.FINISHED
        this.saveCalculatedTask(this.currentTask)
      } else {
        this.currentTask = this.selectedTasks.pop()
        this.status = this.IN_PROGRESS
      }
    },
    saveCalculatedTask(task) {
      this.calculatedTasks[task.id] = task
      LocalStorageAdapter.setItem("calculatedTasks", this.calculatedTasks)
    },
    findCalculatedTask(task) {
      if (this.calculatedTasks != null && this.calculatedTasks[task.id] != null) {
        task = this.calculatedTasks[task.id]
      }
      return task
    },
    submitAnswer() {
      let task = this.findCalculatedTask(this.currentTask)
      task.calculated++
      if (this.currentTask.result === Number.parseInt(this.currentAnswer)) {
        this.calculatedTasks[this.currentTask.id] = task
        this.currentRound.correct++
        this.nextTask()
      } else {
        this.status = this.REVIEW_RESULT
        task.wrong++
        this.calculatedTasks[this.currentTask.id] = task
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>Einmaleins - Training</h1>
    <template v-if="status === INITIATED">
      <h2 class="lead">Wieviele Aufgaben magst du rechnen?</h2>

      <div class="btn-group btn-group-lg" role="group">
        <button class="btn btn-primary" @click="start(10)">10</button>
        <button class="btn btn-primary" @click="start(20)">20</button>
        <button class="btn btn-primary" @click="start(50)">50</button>
        <button class="btn btn-primary" @click="start(100)">100</button>
      </div>
    </template>
    <template v-if="status === IN_PROGRESS || status === REVIEW_RESULT ">
      <div id="current-task">
        <TaskProgressbar :amount="currentRound.amount" :length="selectedTasks.length"/>

        <form id="task-form" onsubmit="return false;">
          <div class="input-group input-group-lg mb-3">
            <span class="input-group-text" id="inputGroup-currentAnswer-lg">{{ currentTask.multiplier }} · {{ currentTask.multiplicand }} =</span>

            <template v-if="status === IN_PROGRESS">
              <input type="number" inputmode="numeric" v-focus class="form-control" aria-describedby="inputGroup-currentAnswer-lg"
                     id="currentAnswer" v-model="currentAnswer" autocomplete="off">
              <button id="submit" class="btn btn-outline-secondary" @click="submitAnswer()">Beantworten</button>
            </template>
            <template v-if="status === REVIEW_RESULT">
              <input type="number" inputmode="numeric" class="form-control bg-danger bold" v-bind:value="currentTask.result" disabled>
              <button v-focus id="nextTask" class="btn btn-outline-secondary" @click="nextTask()">Weiter</button>
            </template>
          </div>
        </form>
      </div>
    </template>
    <template v-if="status === FINISHED">
      <h3>Ergebnis</h3>
      <TaskResult :amount="currentRound.amount" :correct="currentRound.correct"/>
      <button v-focus id="back" class="btn btn-outline-secondary" @click="initialize()">Zurück zum Training</button>
    </template>
  </div>

</template>
