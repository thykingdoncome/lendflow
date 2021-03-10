<template>
  <div class="student-card">
    <button class="acc-btn" @click="isActive = !isActive">
      <i :class="isActive ? 'fas fa-minus' : 'fas fa-plus'"></i>
    </button>
    <div class="student-card-main">
      <div class="student-card-image-wrap">
        <img :src="studentImg" :alt="lastName" />
      </div>
      <div class="student-card-details-wrap">
        <h1>{{ fullName }}</h1>
        <div class="students-card-details-items">
          <p>Email: {{ email }}</p>
          <p>Company: {{ company }}</p>
          <p>Skill: {{ skill }}</p>
          <p>Average: {{ calculateAverage }}</p>
          <ul :class="
              isActive ? 'is-active accordion-content' : 'accordion-content'
            "
          >
            <li v-for="(score, index) in testScores" :key="index">
              <span>Test {{ index + 1 }}:</span> <span>{{ `${score}%` }}</span>
            </li>
          </ul>

          <div class="tags-section">
            <div class="tags-container">
              <div class="tag" v-for="(tag, index) in tags" :key="index">
                {{ tag }}
              </div>
            </div>
            <input
              type="text"
              v-model="tagValue"
              @keyup.enter="addTag()"
              placeholder="Add a tag"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentCard",
  data() {
    return {
      isActive: false,
      tagValue: "",
    };
  },
  props: {
    studentImg: String,
    firstName: String,
    lastName: String,
    company: String,
    email: String,
    skill: String,
    testScores: Array,
    tags: Array,
    id: String,
  },
  methods: {
    addTag() {
      this.$emit("tagAdded", this.tagValue, this.id);
      this.tagValue = ''
    },
  },
  computed: {
    fullName() {
      let fullName = `${this.firstName} ${this.lastName}`;
      return fullName.toUpperCase();
    },
    calculateAverage() {
      let testScoresArr = this.testScores.map((x) => parseInt(x, 10));
      let averageScore = testScoresArr.reduce((a, b) => a + b, 0) / this.testScores.length;
      return `${averageScore}%`;
    },
  },
};
</script>

<style scoped>

h1 {
  color: var(--black);
  font-family: railway-bold;
}

li {
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 110px;
}

.fas {
  color: var(--thin-gray);
  font-size: 2rem;
  cursor: pointer;
}

.fas:active, .fas:hover {
  color: var(--black);
}

.student-card {
  padding: 1rem 0 1.5rem;
  border-bottom: 1px solid var(--thin-gray);
  position: relative;
}

.student-card-main {
  display: flex;
}

.student-card-image-wrap {
  width: 150px;
  height: 150px;
  border: 1px solid var(--thin-gray);
  border-radius: 50%;
  margin-right: 2rem;
}

.student-card-image-wrap img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.students-card-details-items {
  margin-left: 1rem;
  margin-top: 0.5rem;
  line-height: 1.5;
}

.acc-btn {
  position: absolute;
  right: 0;
  top: 1rem;
}

.accordion-content {
  max-height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  transition: 500ms ease;
}

.accordion-content.is-active {
  max-height: 65rem;
}

.tags-container {
  display: flex;
  align-items: center;
  width: 300px;
  flex-wrap: wrap;
}

.tag {
  background: var(--light-gray);
  padding: 0.4rem;
  margin-right: 0.4rem;
  margin-bottom: 0.2rem;
  border-radius: 4px;
}

.tag:nth-of-type(1) {
  margin-left: 0;
}
</style>
