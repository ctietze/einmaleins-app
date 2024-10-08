<script setup>
import MultiplicationTable from "@/components/MultiplicationTable.vue";
import DivisionTable from "@/components/DivisionTable.vue";

const vFocus = {
  mounted: (el) => {
    el.focus()
    el.classList.add("focused")
  }
}
</script>

<script>
import TaskProgressbar from "@/components/TaskProgressbar.vue";
import TaskSelection from "@/components/TaskSelection.vue";
import TaskResult from "@/components/TaskResult.vue";
import RandomSelection from '@/shared/lib/random-selection.js';
import LocalStorageAdapter from '@/shared/lib/local-storage-adapter.js';
import Multiplication from '@/shared/lib/multiplication-tasks.js';
import Division from '@/shared/lib/division-tasks.js';

const Status = {
  INITIATE: 'initiate',
  START: 'start',
  CALCULATE: 'calculate',
  REVIEW: 'review',
  FINISH: 'finish'
}

const Type = {
  MULTIPLICATION: 'multiplication',
  DIVISION: 'division'
}

const CurrentRound = {
  amount: 0,
  correct: 0,
  answer: null,
  task: null,

  reset: function () {
    this.amount = 0
    this.correct = 0
    this.answer = null
    this.task = null
  },
  start: function (amount) {
    this.amount = amount
  }
}

export default {
  name: 'Calculation',
  components: {
    TaskProgressbar,
    TaskResult,
    TaskSelection
  },
  props: {
    type: String
  },
  data: () => ({
    title: "",
    status: Status.INITIATE,
    calculatedTasks: {},
    tasks: [],
    startAmount: 0,
    taskWeights: [],
    selectedTasks: [],
  }),
  created() {
    this.initiate()
  },
  watch: {
    startAmount: function() {
      console.log(this.startAmount)
      this.status = Status.START
      this.next();
    }
  },
  methods: {
    initiate: function () {
      this.status = Status.INITIATE
      this.calculatedTasks = LocalStorageAdapter.getItem(this.type + "Tasks") || {}
      let generateTasksAndWeights = null

      if (this.type === Type.MULTIPLICATION) {
        generateTasksAndWeights = Multiplication.generateTasksAndWeights(this.calculatedTasks);
        this.title = "Multiplikation"
      } else if (this.type === Type.DIVISION) {
        generateTasksAndWeights = Division.generateTasksAndWeights(this.calculatedTasks);
        this.title = "Division"
      } else {
        console.log("Type not supported")
      }

      if(generateTasksAndWeights == null) {
        return
      }
      this.tasks = generateTasksAndWeights.tasks
      this.taskWeights = generateTasksAndWeights.taskWeights
      this.next()
    },

    next() {
      switch (this.status) {
        case Status.INITIATE:
          CurrentRound.reset()
          break
        case Status.START:
          CurrentRound.start(this.startAmount)
          this.selectedTasks = RandomSelection.selectRandomValues(this.tasks, this.taskWeights, this.startAmount)
          this.status = Status.CALCULATE
          this.next()
          break
        case Status.CALCULATE:
          CurrentRound.answer = null
          if (this.selectedTasks.length > 0) {
            CurrentRound.task = this.selectedTasks.pop()
          } else {
            this.saveCalculatedTask(CurrentRound.task)
            this.status = Status.FINISH
            this.next()
          }
          break
        case Status.REVIEW:
          CurrentRound.wrong++
          this.calculatedTasks[CurrentRound.task.id] = CurrentRound.task
          break
        case Status.FINISH:
          break
      }
    },
    saveCalculatedTask(task) {
      this.calculatedTasks[task.id] = task
      LocalStorageAdapter.setItem(this.type + "Tasks", this.calculatedTasks)
    },
    findCalculatedTask(task) {
      if (this.calculatedTasks != null && this.calculatedTasks[task.id] != null) {
        task = this.calculatedTasks[task.id]
      }
      return task
    },
    submitAnswer() {
      let task = this.findCalculatedTask(CurrentRound.task)
      task.calculated++
      if (CurrentRound.task.result === Number.parseInt(CurrentRound.answer)) {
        task.correct++
        CurrentRound.correct++
      } else {
        task.wrong++
        CurrentRound.wrong++
        this.status = Status.REVIEW
      }
      this.calculatedTasks[CurrentRound.task.id] = task
      this.next()
    },
    resume() {
      this.status = Status.CALCULATE
      this.next()
    }
  }
}
</script>
<template>
  <p class="lead">{{ title }}</p>
  <template v-if="status === Status.INITIATE">
    <TaskSelection v-model:startAmount="startAmount" />
  </template>

  <template v-if="status === Status.CALCULATE || status === Status.REVIEW ">
    <div id="current-task">
      <TaskProgressbar :amount="CurrentRound.amount" :length="selectedTasks.length"/>

      <form id="task-form" onsubmit="return false;">
        <div class="input-group input-group-lg mb-3">
        <span class="input-group-text" id="inputGroup-currentAnswer-lg"> {{ CurrentRound.task.formula }} =</span>

          <template v-if="status === Status.CALCULATE">
            <input type="number" inputmode="numeric" v-focus class="form-control"
                   aria-describedby="inputGroup-currentAnswer-lg"
                   id="CurrentRound.answer" v-model="CurrentRound.answer" autocomplete="off">
            <button id="submit" class="btn btn-outline-secondary" @click="submitAnswer()">Beantworten</button>
          </template>
          <template v-if="status === Status.REVIEW">
            <input type="number" inputmode="numeric" class="form-control bg-danger bold"
                   v-bind:value="CurrentRound.task.result" disabled>
            <button v-focus id="resume" class="btn btn-outline-secondary" @click="resume()">Weiter</button>
          </template>
        </div>
      </form>
      <template v-if="status === Status.REVIEW && type === Type.MULTIPLICATION">
        <hr>
        <MultiplicationTable :multiplicand="CurrentRound.task.multiplicand" :multiplier="CurrentRound.task.multiplier"/>
      </template>
      <template v-if="status === Status.REVIEW && type === Type.DIVISION">
        <hr>
        <DivisionTable :dividend="CurrentRound.task.dividend" :divisor="CurrentRound.task.divisor"/>
      </template>
    </div>
  </template>

  <template v-if="status === Status.FINISH">
    <p class="lead">Ergebnis</p>
    <TaskResult :amount="CurrentRound.amount" :correct="CurrentRound.correct"/>
    <button v-focus id="back" class="btn btn-outline-secondary" @click="initiate()">Zurück zum Training</button>
  </template>
</template>